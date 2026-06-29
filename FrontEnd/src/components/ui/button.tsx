import { View, Text, Pressable } from 'react-native'

type ButtonProps = {
  Title: string;
  onPress?: () => void;
  size?: string;
  classname?: string;
  variant?: "primary" | "secondary" | "transparent";
  textColor?: string;
}

const button = ({ Title, onPress, variant = "primary", classname, size, textColor }: ButtonProps) => {
  const sizes = "px-5 py-3";

  const variants = {
    primary: "bg-primary text-white",
    secondary: "bg-secondary text-white",
    transparent: "bg-transparent text-black",
  };
  return (
    <Pressable onPress={onPress} className={`items-center justify-center ${classname} ${size ? size : sizes} ${variants[variant]}`}>
      <Text className={`text-${textColor ? textColor : "white"} `}>{Title}</Text>
    </Pressable>
  )
}

export default button