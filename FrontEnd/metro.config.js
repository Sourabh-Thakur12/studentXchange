const { getDefaultConfig } = require("expo/metro-config");
<<<<<<< HEAD:Frontend/metro.config.js
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./global.css" });
=======
const { withNativewind } = require("nativewind/metro");
 
/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
 
module.exports = withNativewind(config);
>>>>>>> 484988f119f3a0d6f0937710c94a9bdfe7beb9f2:FrontEnd/metro.config.js
