
import {  Controller, useFormContext } from "react-hook-form";
import { NewListingForm } from "@/src/utils/types";
import { View } from "react-native";

import { Input } from "@/components/ui/input";
import { FieldLabel } from "@/components/ui/fieldLabel";


export function CategoryField() {
  const { control } = useFormContext<NewListingForm>();
  return (
    <View className="mt-lg">
      <FieldLabel>Category</FieldLabel>

      <Controller
        control={control}
        name="category"
        render={({ field: { value } }) => (
          <Input
            value={value}
            placeholder="Select Category"
            editable={false}
            rightIcon="chevron-down"
            onPress={() => {
              // TODO:
              // Open Bottom Sheet
            }}
          />
        )}
      />
    </View>
  );
}