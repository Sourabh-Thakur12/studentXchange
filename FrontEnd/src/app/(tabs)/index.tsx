import "@/global.css"
import { Link } from "expo-router";
import { Text, View } from "react-native";
 
export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      {/*for  test*/}
      <Text className="text-xl font-bold text-blue-500">
        Welcome to StudentXchange!
      </Text>
      <Link href={'/(auth)/signUp'} className="text-blue-500 bg-primary-container  m-2 px-10 py-3 rounded-3xl">Sign Up</Link>
      <Link href={'/(auth)/signIn'} className="text-blue-500 bg-primary-container  m-2 px-10 py-3 rounded-3xl">Sign In</Link>
      <Link href={'/onboarding'} className="text-blue-500 bg-primary-container  m-2 px-10 py-3 rounded-3xl">Onboarding</Link>
    </View>
  );
}