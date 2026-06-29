import { Control, Controller } from "react-hook-form";
import { Text, View, Pressable } from "react-native";
import type { NewListingForm } from "@/utils/types";

import { FieldLabel } from "@/components/ui/fieldLabel";
import { CONDITIONS } from "@/constants/Create";

export function ConditionField({
  control,
}: {
  control: Control<NewListingForm>;
}) {
  return (
    <View className="mt-lg">
      <FieldLabel>Condition</FieldLabel>

      <Controller
        control={control}
        name="condition"
        render={({ field: { value, onChange } }) => (
          <View className="flex-row flex-wrap gap-sm">
            {CONDITIONS.map((condition) => {
              const selected = value === condition;

              return (
                <Pressable
                  key={condition}
                  onPress={() => onChange(condition)}
                  className={`
                    rounded-full
                    px-md
                    py-sm
                    ${
                      selected
                        ? "bg-primary"
                        : "bg-surface-low"
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
                    {condition}
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
        Be honest about the item's condition.
      </Text>
    </View>
  );
}