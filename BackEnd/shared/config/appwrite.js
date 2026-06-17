require("dotenv").config();

const sdk = require("node-appwrite");

const {
    Account,
    Client,
    ID,
    Query,
    TablesDB,
    Users,
} = sdk;

const requiredEnv = [
    "APPWRITE_ENDPOINT",
    "APPWRITE_PROJECT_ID",
    "APPWRITE_API_KEY",
    "APPWRITE_DATABASE_ID",
];

for (const key of requiredEnv) {
    if (!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
}

const createClient = () => new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID);

const adminClient = createClient().setKey(process.env.APPWRITE_API_KEY);

const createSessionClient = (sessionSecret) => {
    if (!sessionSecret) {
        throw new Error("Appwrite session secret is required.");
    }

    return createClient().setSession(sessionSecret);
};

module.exports = {
    Account,
    ID,
    Query,
    TablesDB,
    Users,
    adminClient,
    appwriteConfig: {
        databaseId: process.env.APPWRITE_DATABASE_ID,
        usersTableId: process.env.APPWRITE_USERS_TABLE_ID || "users",
        emailVerificationUrl: process.env.EMAIL_VERIFICATION_URL
            || `${process.env.API_BASE_URL || "http://localhost:5000"}/auth/verify-email`,
    },
    createSessionClient,
};
