import { Text, View } from "react-native";

interface BadgeProps {
  title: string;
  variant?: "sell" | "rent";
}

export default function Badge({
  title,
  variant = "sell",
}: BadgeProps) {
  const background =
    variant === "sell"
      ? "bg-primary"
      : "bg-secondary";

  return (
    <View
      className={`
        rounded-full
        px-sm
        py-xs
        ${background}
      `}
    >
      <Text
        className="
          text-on-primary
          font-sand-bold
          text-label-md
          uppercase
        "
      >
        {title}
      </Text>
    </View>
  );
}