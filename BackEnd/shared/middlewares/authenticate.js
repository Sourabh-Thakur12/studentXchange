const {
    Account,
    createSessionClient,
} = require("../config/appwrite");
const AppError = require("../utils/AppError");

const getSessionSecret = (req) => {
    const authHeader = req.headers.authorization;

    if (authHeader?.startsWith("Bearer ")) {
        return authHeader.slice(7).trim();
    }

    return req.headers["x-appwrite-session"] || req.cookies?.session;
};

const authenticate = async (req, res, next) => {
    try {
        const sessionSecret = getSessionSecret(req);

        if (!sessionSecret) {
            throw new AppError("Authentication required.", 401, "AUTHENTICATION_REQUIRED");
        }

        const account = new Account(createSessionClient(sessionSecret));
        const user = await account.get();

        req.user = {
            userId: user.$id,
            email: user.email,
            emailVerification: user.emailVerification,
        };
        req.sessionSecret = sessionSecret;

        return next();
    } catch (error) {
        if (error instanceof AppError) {
            return next(error);
        }

        return next(new AppError("Invalid or expired session.", 401, "INVALID_SESSION"));
    }
};

module.exports = authenticate;
