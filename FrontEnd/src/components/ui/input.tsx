import { TextInput, TextInputProps, View } from "react-native";

export function Input({ ...props }:TextInputProps) {
  return (
    <View className=" flex mx-md justify-center items-center">
      <View className="w-full min-h-12 bg-surface-bright border border-neutral-500 rounded-sm">
        <TextInput className="w-full mx-sm " {...props} />
      </View>
    </View>
  );
}