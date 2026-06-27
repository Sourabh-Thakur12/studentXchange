import { Pressable, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onFilterPress?: () => void;
}

export default function SearchBar({
  placeholder = "Search for books, tech, housing...",
  value,
  onChangeText,
  onFilterPress,
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState("");

  const controlled = value !== undefined;

  return (
    <View
      className="
        h-12
        flex-row
        items-center
        rounded-component
        bg-surface-low
        border
        border-outline-variant
        px-md
      "
    >
      <Ionicons
        name="search"
        size={18}
        color="rgb(var(--color-outline))"
      />

      <TextInput
        className="
          flex-1
          ml-sm
          font-sand
          text-body-md
          leading-body-md
          text-on-surface
        "
        placeholder={placeholder}
        placeholderTextColor="rgb(var(--color-outline))"
        value={controlled ? value : internalValue}
        onChangeText={(text) => {
          if (!controlled) setInternalValue(text);
          onChangeText?.(text);
        }}
        returnKeyType="search"
      />

      <Pressable
        hitSlop={8}
        onPress={onFilterPress}
        className="
          ml-sm
          h-8
          w-8
          items-center
          justify-center
          rounded-full
        "
      >
        <Ionicons
          name="options-outline"
          size={18}
          color="rgb(var(--color-outline))"
        />
      </Pressable>
    </View>
  );
}