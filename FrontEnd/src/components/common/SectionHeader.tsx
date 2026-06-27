import { Pressable, Text, View } from "react-native";

interface SectionHeaderProps {
  title: string;
  action?: string;
  onPress?: () => void;
}

export default function SectionHeader({
  title,
  action,
  onPress,
}: SectionHeaderProps) {
  return (
    <View className="flex-row items-end justify-between">
      {/* Left */}

      <Text
        className="
          font-sand-bold
          text-2xl
          text-headline-lg-mobile
          leading-headline-lg-mobile
          text-on-surface
        "
      >
        {title}
      </Text>

      {/* Right */}

      {action && (
        <Pressable onPress={onPress}>
          <Text
            className="
              font-sand-semi-bold
              text-sm
              text-label-md
              text-primary
              uppercase
              tracking-label-md
            "
          >
            {action}
          </Text>
        </Pressable>
      )}
    </View>
  );
}