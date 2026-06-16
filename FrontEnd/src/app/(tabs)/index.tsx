import "@/global.css"
import { Text, View } from "react-native";
import { SignInScreen } from "@/src/components/ui/auth";
 
export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      {/*for  test*/}
      <SignInScreen />
      <Text className="text-xl font-bold text-blue-500">
        Welcome to StudentXchange!
      </Text>
    </View>
  );
}