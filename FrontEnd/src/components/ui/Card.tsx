import { Pressable, PressableProps} from "react-native";

interface CardProps extends PressableProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({
  children,
  className = "",
  ...props
}: CardProps) {
  return (
    <Pressable
      android_ripple={{ color: "#ddd" }}
      className={`
        overflow-hidden
        rounded-component
        bg-card
        shadow-level-1
        ${className}
      `}
      style={({ pressed }) => ({
        transform: [{ scale: pressed ? 0.98 : 1 }],
      })}
      {...props}
    >
      {children}
    </Pressable>
  );
}