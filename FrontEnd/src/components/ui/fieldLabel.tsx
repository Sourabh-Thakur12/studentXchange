
import { Text } from "react-native";

export function FieldLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Text
      className="
      mb-xs
        font-sand-medium
        text-label-md
        uppercase
        tracking-wide
        text-outline
      "
    >
      {children}
    </Text>
  );
}