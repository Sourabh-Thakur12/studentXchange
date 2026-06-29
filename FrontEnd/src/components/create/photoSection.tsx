
import { Control, Controller } from "react-hook-form";
import { NewListingForm } from "@/src/utils/types";
import { ScrollView, Pressable, Text, Image, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { FieldLabel } from "@/components/ui/fieldLabel";

export function PhotosSection({
  control,
}: {
  control: Control<NewListingForm>;
}) {

  
  return (
    <>
      <FieldLabel>Photos</FieldLabel>
      

      <Controller
        control={control}
        name="photos"
        render={({ field: { value } }) => (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-sm"
          >
            {/* Upload Button */}

            <Pressable
              className="
                h-24
                w-24
                items-center
                justify-center
                rounded-component
                border
                border-dashed
                border-outline-variant
                bg-surface-low
              "
            >
              <FontAwesome
                name="camera"
                size={22}
                color="#737a68"
              />

              <Text
                className="
                  mt-xs
                  font-sand
                  text-label-md
                  text-outline
                "
              >
                Add Photo
              </Text>
            </Pressable>

            {/* Uploaded Images */}

            {value.map((uri, index) => (
              <View
                key={index}
                className="
                  h-24
                  w-24
                  overflow-hidden
                  rounded-component
                  bg-surface-high
                "
              >
                <Image
                  source={{ uri }}
                  resizeMode="cover"
                  className="h-full w-full"
                />

                <Pressable
                  className="
                    absolute
                    right-xs
                    top-xs
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-full
                    bg-on-surface/70
                  "
                >
                  <FontAwesome
                    name="close"
                    size={12}
                    color="white"
                  />
                </Pressable>
              </View>
            ))}
          </ScrollView>
        )}
      />
    </>
  );
}