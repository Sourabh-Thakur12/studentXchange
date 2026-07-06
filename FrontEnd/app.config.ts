// import loadenv from 'dotenv'
// import path from 'path'
// import { fileURLToPath } from 'url'

// loadenv.config({
//   path : path.resolve(fileURLToPath(import.meta.url), '../.env')
// })

export default {
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
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: "com.sourabhthakur.FrontEnd",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-font",
        {
          fonts: [
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
            "./assets/fonts/Quicksand-Bold.ttf",
          ],
        },
      ],
      [
        "expo-image-picker",
        {
          "photosPermission":
            "The app accesses your photos to let you share them with your friends.",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
  },
};
