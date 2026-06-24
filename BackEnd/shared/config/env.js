const loadenv = require('dotenv')
const path = require('path')

loadenv.config({
  path : path.resolve(__dirname, '../../../.env')
})

const readEnv = (key) => {
  const value = process.env[key];

  return typeof value === "string" ? value.trim() : value;
};

const expressAppBaseUrl = readEnv("EXPRESS_APP_BASE_URL") || readEnv("APP_BASE_URL");
const expressPort = readEnv("EXPRESS_PORT") || readEnv("PORT");
const frontendAppBaseUrl = readEnv("FRONTEND_APP_BASE_URL") || "http://192.168.1.3:8081";

const config = {
  APPWRITE_ENDPOINT: readEnv("APPWRITE_ENDPOINT"),
  APPWRITE_PROJECT_ID: readEnv("APPWRITE_PROJECT_ID"),
  APPWRITE_DATABASE_ID: readEnv("APPWRITE_DATABASE_ID"),
  APPWRITE_API_KEY: readEnv("APPWRITE_API_KEY"),
  APPWRITE_USERS_TABLE_ID: readEnv("APPWRITE_USERS_TABLE_ID"),
  APPWRITE_EMAIL_VERIFICATION_URL: readEnv("APPWRITE_EMAIL_VERIFICATION_URL")
    || `${frontendAppBaseUrl.replace(/\/$/, "")}/verifyEmail`,
  EXPRESS_APP_BASE_URL: expressAppBaseUrl
    ? expressAppBaseUrl.replace(/\/$/, "")
    : `http://192.168.29.180${expressPort ? `:${expressPort}` : ":5000"}`,

  EXPRESS_PORT: expressPort || "5000",
  ENVIRONMENT: readEnv("ENVIRONMENT") || "development",
}

module.exports = config
