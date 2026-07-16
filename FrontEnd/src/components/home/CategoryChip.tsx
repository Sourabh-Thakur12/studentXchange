import { Pressable, Text } from "react-native";

export interface CategoryChipProps {
  icon: string;
  label: string;
  active?: boolean;
  onPress?: () => void;
}

export default function CategoryChip({
  icon,
  label,
  active = false,
  onPress,
}: CategoryChipProps) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "#ddd" }}
      className={`
        flex-row
        items-center
        rounded-full
        px-md
        py-sm
        mr-sm
        ${
          active
            ? "bg-primary-container"
            : "bg-surface-low"
        }
      `}
    >
      <Text className="mr-xs text-body-lg">
        {icon}
      </Text>

      <Text
        className={`
          font-sand-medium
          text-body-md
          ${
            active
              ? "text-primary"
              : "text-on-surface-variant"
          }
        `}
      >
        {label}
      </Text>
    </Pressable>
  );
}