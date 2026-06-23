const loadenv = require('dotenv')
const path = require('path')

loadenv.config({
<<<<<<< HEAD
  path : path.resolve(__dirname, '../../.env')
=======
  path : path.resolve(__dirname, '../../../.env')
>>>>>>> df74b623a7b6298d7808ef36925c80a3cb2275a2
})

const config = {
  APPWRITE_ENDPOINT: process.env.APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID: process.env.APPWRITE_PROJECT_ID,
  APPWRITE_DATABASE_ID: process.env.APPWRITE_DATABASE_ID,
  APPWRITE_API_KEY: process.env.APPWRITE_API_KEY,
  APPWRITE_USERS_TABLE_ID: process.env.APPWRITE_USERS_TABLE_ID,
  APPWRITE_EMAIL_VERIFICATION_URL: process.env.APPWRITE_EMAIL_VERIFICATION_URL,
  EXPRESS_APP_BASE_URL: process.env.EXPRESS_APP_BASE_URL,

  EXPRESS_PORT : process.env.EXPRESS_PORT
}

<<<<<<< HEAD
module.exports = config
=======
module.exports = config
>>>>>>> df74b623a7b6298d7808ef36925c80a3cb2275a2
