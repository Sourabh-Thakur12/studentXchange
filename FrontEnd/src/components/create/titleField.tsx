
import { Controller, useFormContext } from "react-hook-form";
import { Text, View } from "react-native";
import { Input } from "@/components/ui/input";
import { FieldLabel } from "@/components/ui/fieldLabel";

import { NewListingForm } from "@/utils/types";

export function TitleField() {
  const { control } = useFormContext<NewListingForm>();
  return (
    <View className="mt-lg">
      <FieldLabel>Listing Title</FieldLabel>

      <Controller
        control={control}
        name="title"
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="MacBook Pro M3 16GB"
            returnKeyType="next"
          />
        )}
      />

      <Text
        className="
          mt-xs
          font-sand
          text-label-md
          text-outline
        "
      >
        Give your listing a clear and descriptive title.
      </Text>
    </View>
  );

}