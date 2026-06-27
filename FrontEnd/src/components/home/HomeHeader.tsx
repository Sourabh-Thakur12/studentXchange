import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeHeader() {
  return (
    <View className="gap-md">
      {/* Top App Bar */}
      {/*<View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Ionicons
            name="location-outline"
            size={20}
            color="rgb(var(--color-primary))"
          />

          <Text
            className="
              ml-1
              text-title-md
              leading-title-md
              font-sand-bold
              text-primary
            "
          >
            CampusXchange
          </Text>
        </View>

        <Pressable
          android_ripple={{ color: "#ddd", borderless: true }}
          className="
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            bg-surface
          "
        >
          <Ionicons
            name="notifications-outline"
            size={22}
            color="rgb(var(--color-primary))"
          />
        </Pressable>
      </View>
*/}
      {/* Greeting */}
      <View>
        <Text
          className="
            font-sand-bold
            text-headline-lg-mobile
            leading-headline-lg-mobile
            text-on-surface
          "
        >
          Hey, Alex! 👋
        </Text>

        <View className="mt-xs flex-row items-center">
          <Ionicons
            name="school-outline"
            size={13}
            color="rgb(var(--color-outline))"
          />

          <Text
            className="
              ml-1
              text-label-md
              leading-label-md
              font-sand-medium
              text-outline
            "
          >
            Stanford University
          </Text>

          <Ionicons
            name="chevron-down"
            size={14}
            color="rgb(var(--color-outline))"
            style={{ marginLeft: 4 }}
          />
        </View>
      </View>
    </View>
  );
}