
import { Control, Controller } from "react-hook-form";
import { NewListingForm } from "@/utils/types";
import { Text, View } from "react-native";
import { FieldLabel } from "@/components/ui/fieldLabel";
import { Input } from "@/components/ui/input";

const MAX_DESCRIPTION_LENGTH = 500;

export function DescriptionField({
  control,
}: {
  control: Control<NewListingForm>;
}) {
  return (
    <View className="mt-lg">
      <FieldLabel>Description</FieldLabel>

      <Controller
        control={control}
        name="description"
        render={({ field: { value, onChange, onBlur } }) => (
          <>
            <Input
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Describe the item, its condition, accessories included, reason for selling..."
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              className="min-h-36"
            />

            <View className="mt-xs flex-row items-center justify-between">
              <Text
                className="
                  font-sand
                  text-label-md
                  text-outline
                "
              >
                Include important details for buyers.
              </Text>

              <Text
                className="
                  font-mono
                  text-label-md
                  text-outline
                "
              >
                {value.length}/{MAX_DESCRIPTION_LENGTH}
              </Text>
            </View>
          </>
        )}
      />
    </View>
  );
}
