// import loadenv from 'dotenv'
// import path from 'path'
// import { fileURLToPath } from 'url'


// loadenv.config({
//   path : path.resolve(fileURLToPath(import.meta.url), '../.env')
// })

export default {
<<<<<<< HEAD
<<<<<<< HEAD
  "expo": {
    "name": "campusxchange",
    "slug": "campusxchange",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "campusxchange",
=======
  "expo": {
    "name": "campusxchange",
    "slug": "campusxchange",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
<<<<<<< HEAD
    "scheme": "frontend",
>>>>>>> af3c10a (feat: centrailised api client)
=======
    "scheme": "campusxchange",
>>>>>>> cfc2ef7 (feat: added developmnt build)
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/images/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
<<<<<<< HEAD
=======
  expo: {
    name: "FrontEnd",
    slug: "FrontEnd",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "frontend",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
      image: "./assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
>>>>>>> f2468b1 (feat: image picker added)
=======
>>>>>>> af3c10a (feat: centrailised api client)
    },
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      "usesCleartextTraffic": true,
      "edgeToEdgeEnabled": true,
      "predictiveBackGestureEnabled": false,
      "package": "com.sourabhthakur.campusxchange"
<<<<<<< HEAD
=======
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: "com.sourabhthakur.FrontEnd",
>>>>>>> f2468b1 (feat: image picker added)
=======
=======
      "usesCleartextTraffic": true,
>>>>>>> 223359e (changes)
      "edgeToEdgeEnabled": true,
      "predictiveBackGestureEnabled": false,
      "package": "com.sourabhthakur.FrontEnd"
>>>>>>> af3c10a (feat: centrailised api client)
=======
>>>>>>> cfc2ef7 (feat: added developmnt build)
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-font",
        {
          "fonts": [
            "./assets/fonts/JetBrainsMono-ExtraLight.ttf",
            "./assets/fonts/JetBrainsMono-Regular.ttf",
            "./assets/fonts/JetBrainsMono-Medium.ttf",
            "./assets/fonts/JetBrainsMono-Bold.ttf",
            "./assets/fonts/JetBrainsMono-ExtraBold.ttf",
            "./assets/fonts/JetBrainsMono-Italic.ttf",
            "./assets/fonts/JetBrainsMono-Light.ttf",
            "./assets/fonts/JetBrainsMono-Thin.ttf",
            "./assets/fonts/Quicksand-Light.ttf",
            "./assets/fonts/Quicksand-Regular.ttf",
            "./assets/fonts/Quicksand-Medium.ttf",
            "./assets/fonts/Quicksand-SemiBold.ttf",
            "./assets/fonts/Quicksand-Bold.ttf"
          ]
        }
      ],
      "react-native-email-link"
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "eas": {
        "projectId": "77e37c37-b444-4608-b68a-02eb624288cc"
      }
    }
  }
}
