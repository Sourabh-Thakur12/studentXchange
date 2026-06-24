const loadenv = require('dotenv')
const path = require('path')

loadenv.config({
  path : path.resolve(__dirname, '../../../.env')
})

const config = {
  APPWRITE_ENDPOINT: process.env.APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID: process.env.APPWRITE_PROJECT_ID,
  APPWRITE_DATABASE_ID: process.env.APPWRITE_DATABASE_ID,
  APPWRITE_API_KEY: process.env.APPWRITE_API_KEY,
  APPWRITE_USERS_TABLE_ID: process.env.APPWRITE_USERS_TABLE_ID,
  APPWRITE_EMAIL_VERIFICATION_URL: process.env.APPWRITE_EMAIL_VERIFICATION_URL,
  EXPRESS_APP_BASE_URL: `${process.env.EXPRESS_APP_BASE_URL}:${process.env.EXPRESS_PORT}`,

  EXPRESS_PORT : process.env.EXPRESS_PORT
}

module.exports = config
