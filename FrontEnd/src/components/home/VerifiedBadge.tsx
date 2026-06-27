import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

export default function VerifiedBadge() {
  return (
    <View
      className="
        ml-xs
        h-4
        w-4
        items-center
        justify-center
        rounded-full
        bg-primary
      "
    >
      <Ionicons
        name="checkmark"
        size={10}
        color="white"
      />
    </View>
  );
}