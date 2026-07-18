import { Controller, useFormContext } from "react-hook-form";
import { NewListingForm } from "@/src/utils/types";
import { ScrollView, Pressable, Text, Image, View, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { FieldLabel } from "@/components/ui/fieldLabel";
// import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export function PhotosSection() {
  const { control } = useFormContext<NewListingForm>();
  // const [image, setImage] = useState<string | undefined>(undefined);
  const pickImage = async (photos: string[], onChange: (photos: string[]) => void) => {
    const permissionResult =
      await ImagePicker.getMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Required",
        "Permission to acess storage is required",
      );
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      onChange([...photos, result.assets[0].uri])
    }
  };

  return (
    <>
      <FieldLabel>Photos</FieldLabel>

      <Controller
        control={control}
        name="photos"
        render={({ field: { value, onChange } }) => (
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
              onPress={() => pickImage(value, onChange)}
              
            >
              <FontAwesome name="camera" size={22} color="#737a68" />

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
                  source={{ uri: uri }}
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
                  onPress={() => {
                    onChange(value.filter((_, i) => i !== index));
                  }}
                >
                  <FontAwesome name="close" size={12} color="white" />
                </Pressable>
              </View>
            ))}
          </ScrollView>
        )}
      />
    </>
  );
}
