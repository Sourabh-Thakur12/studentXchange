// import loadenv from 'dotenv'
// import path from 'path'
// import { fileURLToPath } from 'url'


// loadenv.config({
//   path : path.resolve(fileURLToPath(import.meta.url), '../../../.env')
// })

// TODO: expo constant to extras in app.config.ts and read via express
const config = {
  BASE_URL: process.env.EXPRESS_BASE_URL,
  APPWRITE_PROJECT_ID: process.env.APPWRITE_PROJECT_ID,
  APPWRITE_DATABASE_ID: process.env.APPWRITE_DATABASE_ID,
  APPWRITE_API_KEY: process.env.APPWRITE_API_KEY,

  EXPRESS_PORT : process.env.EXPRESS_PORT
}

export default config