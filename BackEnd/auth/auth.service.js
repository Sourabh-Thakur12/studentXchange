const {
    Account,
    ID,
    Query,
    TablesDB,
    Users,
    adminClient,
    appwriteConfig,
    createBaseClient,
    createSessionClient,
} = require("../shared/config/appwrite");
const AppError = require("../shared/utils/AppError");

const account = new Account(createBaseClient());
const tablesDB = new TablesDB(adminClient);
const users = new Users(adminClient);

const { databaseId, usersTableId, emailVerificationUrl } = appwriteConfig;

const isCollegeEmail = (email) => email.toLowerCase().endsWith("@ddu.du.ac.in");

const toPublicUser = (userRow) => ({
    id: userRow.$id,
    userId: userRow.userId,
    name: userRow.name,
    email: userRow.email,
    avatarUrl: userRow.avatarUrl || null,
    verified: Boolean(userRow.verified),
    createdAt: userRow.createdAt,
});

const toPublicSession = (session) => ({
    id: session.$id,
    userId: session.userId,
    secret: session.secret,
    provider: session.provider,
    providerUid: session.providerUid,
    expire: session.expire,
});

const mapAppwriteError = (error, fallbackMessage = "Appwrite request failed.") => {
    if (error instanceof AppError) {
        return error;
    }

    if (error.type === "general_unauthorized_scope") {
        return new AppError(
            "Appwrite API key is missing required permissions. Add users.read, users.write, rows.read, rows.write, and sessions.write scopes to the backend API key.",
            502,
            "APPWRITE_UNAUTHORIZED_SCOPE",
            error.message
        );
    }

    const message = error.message || fallbackMessage;

    if (error.code === 400 && /password/i.test(message)) {
        return new AppError("Password is too weak.", 400, "WEAK_PASSWORD");
    }

    if (error.code === 401) {
        return new AppError("Invalid credentials.", 401, "INVALID_CREDENTIALS");
    }

    if (error.code === 404) {
        return new AppError("User not found.", 404, "USER_NOT_FOUND");
    }

    if (error.code === 409) {
        return new AppError("Email already exists.", 409, "DUPLICATE_EMAIL");
    }

    if (error.code >= 400 && error.code < 500) {
        return new AppError(message, error.code, "APPWRITE_ERROR");
    }

    return new AppError(fallbackMessage, 502, "APPWRITE_FAILURE");
};

const getUserRowById = async (userId) => {
    try {
        return await tablesDB.getRow({
            databaseId,
            tableId: usersTableId,
            rowId: userId,
        });
    } catch (error) {
        if (error.code === 404) {
            throw new AppError("User not found.", 404, "USER_NOT_FOUND");
        }

        throw new AppError("Database request failed.", 502, "DATABASE_FAILURE");
    }
};

const findUserRowByEmail = async (email) => {
    let result;

    try {
        result = await tablesDB.listRows({
            databaseId,
            tableId: usersTableId,
            queries: [Query.equal("email", email)],
        });
    } catch (error) {
        throw new AppError("Database request failed.", 502, "DATABASE_FAILURE");
    }

    return result.rows[0] || null;
};

const ensureEmailIsAvailable = async (email) => {
    const existingProfile = await findUserRowByEmail(email);

    if (existingProfile) {
        throw new AppError("Email already exists.", 409, "DUPLICATE_EMAIL");
    }

    const existingAuthUsers = await users.list({
        queries: [Query.equal("email", email)],
    });

    if (existingAuthUsers.total > 0) {
        throw new AppError("Email already exists.", 409, "DUPLICATE_EMAIL");
    }
};

const createVerificationForUser = async (userId) => {
    const session = await users.createSession({ userId });

    if (!session.secret) {
        throw new AppError(
            "Appwrite did not return a session secret for email verification.",
            502,
            "APPWRITE_SESSION_SECRET_MISSING"
        );
    }

    const sessionAccount = new Account(
        createSessionClient(session.secret)
    );

    try {
        await sessionAccount.createEmailVerification({
            url: emailVerificationUrl,
        });

    } finally {
        await sessionAccount
            .deleteSession({ sessionId: "current" })
            .catch(() => null);
    }
};


const deleteCurrentSession = async (sessionSecret) => {
    const sessionAccount = new Account(createSessionClient(sessionSecret));

    await sessionAccount.deleteSession({ sessionId: "current" }).catch(() => null);
};

const rollbackCreatedUser = async (userId) => {
    if (!userId) {
        return;
    }

    await users.delete({ userId }).catch(() => null);
    await tablesDB.deleteRow({
        databaseId,
        tableId: usersTableId,
        rowId: userId,
    }).catch(() => null);
};

const register = async ({ name, email, password }) => {
    if (!isCollegeEmail(email)) {
        throw new AppError("Only @ddu.du.ac.in email addresses are allowed.", 400, "INVALID_COLLEGE_EMAIL");
    }

    await ensureEmailIsAvailable(email);

    let createdUser = null;

    try {
        createdUser = await users.create({
            userId: ID.unique(),
            email,
            password,
            name,
        });

        let userRow;

        try {
            userRow = await tablesDB.createRow({
                databaseId,
                tableId: usersTableId,
                rowId: createdUser.$id,
                data: {
                    userId: createdUser.$id,
                    name,
                    email,
                    createdAt: new Date().toISOString(),
                    verified: false,
                },
            });
        } catch (error) {
            throw new AppError("Database request failed.", 502, "DATABASE_FAILURE", error);
        }

        await createVerificationForUser(createdUser.$id);

        return {
            user: toPublicUser(userRow),
        };

    } catch (error) {
        await rollbackCreatedUser(createdUser?.$id);

        if (error instanceof AppError) {
            throw error;
        }

        throw mapAppwriteError(error, "Registration failed.");
    }

};

const login = async ({ email, password }) => {
    if (!isCollegeEmail(email)) {
        throw new AppError("Only @ddu.du.ac.in email addresses are allowed.", 400, "INVALID_COLLEGE_EMAIL");
    }

    let session = null;

    try {
        session = await account.createEmailPasswordSession({ email, password });

        const authUser = await users.get({ userId: session.userId });

        if (!authUser.emailVerification) {
            await deleteCurrentSession(session.secret);

            throw new AppError("Please verify your email before logging in.", 403, "UNVERIFIED_EMAIL");
        }

        let userRow = await getUserRowById(session.userId);

        if (!userRow.verified) {
            userRow = await tablesDB.updateRow({
                databaseId,
                tableId: usersTableId,
                rowId: session.userId,
                data: { verified: true },
            });
        }

        return {
            user: toPublicUser(userRow),
            session: toPublicSession(session),
        };
    } catch (error) {
        if (session && !(error instanceof AppError)) {
            await deleteCurrentSession(session.secret);
        }

        throw mapAppwriteError(error, "Login failed.");
    }
};

const verifyEmail = async ({ userId, secret }) => {
    try {
        await account.updateEmailVerification({ userId, secret });
        await users.updateEmailVerification({ userId, emailVerification: true });

        const userRow = await tablesDB.updateRow({
            databaseId,
            tableId: usersTableId,
            rowId: userId,
            data: { verified: true },
        });

        return {
            user: toPublicUser(userRow),
        };
    } catch (error) {
        if ([400, 401, 404].includes(error.code)) {
            throw new AppError("Verification link is invalid or has expired.", 400, "EXPIRED_OR_INVALID_VERIFICATION_LINK");
        }

        if (error instanceof AppError) {
            throw error;
        }

        throw mapAppwriteError(error, "Email verification failed.");
    }
};

const getCurrentUser = async (userId) => {
    const userRow = await getUserRowById(userId);

    return {
        user: toPublicUser(userRow),
    };
};

module.exports = {
    getCurrentUser,
    login,
    register,
    verifyEmail,
};
