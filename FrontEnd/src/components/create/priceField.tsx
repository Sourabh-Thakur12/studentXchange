import { Control, Controller } from "react-hook-form";
import { NewListingForm } from "@/utils/types";
import { Text, View } from "react-native";
import { FieldLabel } from "@/components/ui/fieldLabel";
import { Input } from "@/components/ui/input";


export function PriceField({
  control,
}: {
  control: Control<NewListingForm>;
}) {
  return (
    <View className="mt-lg">
      <FieldLabel>Price</FieldLabel>

      <Controller
        control={control}
        name="price"
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="0.00"
            keyboardType="decimal-pad"
            returnKeyType="next"
            leftElement={
              <Text
                className="
                  font-sand-bold
                  text-body-lg
                  text-on-surface
                "
              >
                ₹
              </Text>
            }
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
        Enter the asking price for your listing.
      </Text>
    </View>
  );
}
