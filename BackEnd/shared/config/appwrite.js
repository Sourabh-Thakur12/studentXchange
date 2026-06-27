const config = require("./env");
const {
    Account,
    Client,
    ID,
    Query,
    TablesDB,
    Users,
} = require("node-appwrite");

const appwriteConfig = {
    endpoint: config.APPWRITE_ENDPOINT,
    projectId: config.APPWRITE_PROJECT_ID,
    apiKey: config.APPWRITE_API_KEY,
    databaseId: config.APPWRITE_DATABASE_ID,
    usersTableId: config.APPWRITE_USERS_TABLE_ID || "users",
    emailVerificationUrl: config.APPWRITE_EMAIL_VERIFICATION_URL,
    backendEmailVerificationUrl: `${config.EXPRESS_APP_BASE_URL || "http://localhost:5000"}/auth/verify-email`,
};

const requiredServerEnv = [
    "APPWRITE_ENDPOINT",
    "APPWRITE_PROJECT_ID",
    "APPWRITE_API_KEY",
    "APPWRITE_DATABASE_ID",
];

const missingServerEnv = requiredServerEnv.filter((key) => !config[key]);

if (missingServerEnv.length > 0) {
    throw new Error(`Missing required Appwrite server env values: ${missingServerEnv.join(", ")}`);
}

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
