
import {  Controller, useFormContext } from "react-hook-form";
import { NewListingForm } from "@/utils/types";
import { Text, View, Pressable } from "react-native";
import { FieldLabel } from "@/components/ui/fieldLabel";

export function ListingTypeField() {
  const { control } = useFormContext<NewListingForm>();
  return (
    <View className="mt-lg">
      <FieldLabel>I am looking to</FieldLabel>

      <Controller
        control={control}
        name="type"
        render={({ field: { value, onChange } }) => (
          <View
            className="
              flex-row
              rounded-component
              bg-surface-low
              p-xs
            "
          >
            {[
              {
                label: "Sell",
                value: "sell",
              },
              {
                label: "Buy",
                value: "buy",
              },
              {
                label: "Exchange",
                value: "exchange",
              },
            ].map((item) => {
              const selected = value === item.value;

              return (
                <Pressable
                  key={item.value}
                  onPress={() => onChange(item.value)}
                  className={`
                    flex-1
                    items-center
                    rounded-component
                    py-sm
                    ${
                      selected
                        ? "bg-primary"
                        : "bg-transparent"
                    }
                  `}
                >
                  <Text
                    className={`
                      font-sand-medium
                      text-body-md
                      ${
                        selected
                          ? "text-on-primary"
                          : "text-on-surface"
                      }
                    `}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
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
        Select what you're looking to do with this listing.
      </Text>
    </View>
  );
}
