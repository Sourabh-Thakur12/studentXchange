// import loadenv from 'dotenv'
// import path from 'path'
// import { fileURLToPath } from 'url'


// loadenv.config({
//   path : path.resolve(fileURLToPath(import.meta.url), '../../../.env')
// })

const trimTrailingSlash = (value: string | undefined) => value?.trim().replace(/\/$/, "");

const config = {
  BASE_URL: trimTrailingSlash(process.env.EXPO_PUBLIC_EXPRESS_BASE_URL),
  APPWRITE_PROJECT_ID: process.env.APPWRITE_PROJECT_ID,
  APPWRITE_DATABASE_ID: process.env.APPWRITE_DATABASE_ID,
  APPWRITE_API_KEY: process.env.APPWRITE_API_KEY,

  EXPRESS_PORT : process.env.EXPRESS_PORT
}

export default config
