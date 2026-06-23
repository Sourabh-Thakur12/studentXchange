require("dotenv").config();

const {
    Account,
    Client,
    ID,
    Query,
    TablesDB,
    Users,
} = require("node-appwrite");

const appwriteConfig = {
    endpoint: process.env.APPWRITE_ENDPOINT,
    projectId: process.env.APPWRITE_PROJECT_ID,
    apiKey: process.env.APPWRITE_API_KEY,
    databaseId: process.env.APPWRITE_DATABASE_ID,
    usersTableId: process.env.APPWRITE_USERS_TABLE_ID || "users",
    emailVerificationUrl: process.env.APPWRITE_EMAIL_VERIFICATION_URL
        || `${process.env.APP_BASE_URL || "http://localhost:5000"}/auth/verify-email`,
};

const createBaseClient = () => new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId);

const adminClient = createBaseClient()
    .setKey(appwriteConfig.apiKey);

const createSessionClient = (sessionSecret) => createBaseClient()
    .setSession(sessionSecret);

module.exports = {
    Account,
    ID,
    Query,
    TablesDB,
    Users,
    adminClient,
    appwriteConfig,
    createBaseClient,
    createSessionClient,
};
