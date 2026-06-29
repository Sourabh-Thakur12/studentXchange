//REFACTOR thIS monsTROSITY
import { View, Text, TextInput, ScrollView, Image, Pressable } from "react-native";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import { useForm, Controller, Control } from "react-hook-form";

import {
  Card,
  Button
} from "@/components/ui/index"




const SafeAreaView = styled(RNSafeAreaView);

type NewListingForm = {
  photos: string[];
  title: string;
  category: string;
  type: "sell" | "buy" | "both";
  price: string;
  condition: string;
  description: string;
};

const CATEGORY_OPTIONS = [
  {
    label: "Books",
    value: "books",
  },
  {
    label: "Electronics",
    value: "electronics",
  },
  {
    label: "Furniture",
    value: "furniture",
  },
  {
    label: "Hostel",
    value: "hostel",
  },
  {
    label: "Sports",
    value: "sports",
  },
];



function Header() {
  return (
    <View className="flex-row items-center bg-primary-fixed w-full border-b-gray-600 border-b">
      <Entypo name="cross" size={24} className="text-on-primary-container" />
      <Text className="font-sand-bold text-2xl text-on-primary-container py-4 mx-6">
        New Listing
      </Text>
    </View>
  );
}

function Input({ placeholder }: { placeholder: string }) {
  return (
    <View className="mx-lg w-full">
      <View className="mx-lg w-12/13 min-h-12 bg-surface-bright border border-neutral-500 rounded-sm">
        <TextInput className="w-full mx-sm " placeholder={placeholder} />
      </View>
    </View>
  );
}

function PhotosSection({
  control,
}: {
  control: Control<NewListingForm>;
}) {

  
  return (
    <>
      <Text
        className="
          mb-sm
          font-sand-medium
          text-label-md
          uppercase
          tracking-wide
          text-outline
        "
      >
        Photos
      </Text>

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

function TitleField({
  control,
}: {
  control: Control<NewListingForm>;
}) {
  return (
    <View className="mt-lg">
      <Text
        className="
          mb-xs
          font-sand-medium
          text-label-md
          uppercase
          tracking-wide
          text-outline
        "
      >
        Listing Title
      </Text>

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


function CategoryField({
  control,
}: {
  control: Control<NewListingForm>;
}) {
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

function ListingTypeField({
  control,
}: {
  control: Control<NewListingForm>;
}) {
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

function PriceField({
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

      

function FieldLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Text
      className="
        mb-xs
        font-sand-medium
        text-label-md
        uppercase
        tracking-wide
        text-outline
      "
    >
      {children}
    </Text>
  );
}

const CONDITIONS = [
  "New",
  "Like New",
  "Good",
  "Fair",
] as const;

function ConditionField({
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

const MAX_DESCRIPTION_LENGTH = 500;

function DescriptionField({
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

function VerificationSection() {
  return (
    <Card className="mt-xl p-md">
      <View className="flex-row items-start">

        {/* Icon */}

        <View
          className="
            mr-md
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-primary-container
          "
        >
          <Ionicons
            name="shield-checkmark"
            size={24}
            color="#3c6a00"
          />
        </View>

        {/* Content */}

        <View className="flex-1">

          <Text
            className="
              font-sand-bold
              text-title-md
              text-on-surface
            "
          >
            Campus Verified Listing
          </Text>

          <Text
            className="
              mt-xs
              font-sand
              text-body-md
              text-on-surface-variant
            "
          >
            Your listing will be marked as verified once
            you're authenticated with your college email.
          </Text>

          <View className="mt-md flex-row items-center">

            <Ionicons
              name="checkmark-circle"
              size={18}
              color="#3c6a00"
            />

            <Text
              className="
                ml-xs
                font-sand-medium
                text-body-md
                text-primary
              "
            >
              Trusted by students
            </Text>

          </View>

        </View>

      </View>
    </Card>
  );
}

function Footer() {
  return (
    <View
      className="
        border-t
        border-outline-variant
        bg-surface
        px-md
        py-md
      "
    >
      <View className="flex-row items-center justify-between">
        {/* Left */}

        <View>
          <Text
            className="
              font-sand
              text-label-md
              uppercase
              text-outline
            "
          >
            Listing Fee
          </Text>

          <Text
            className="
              mt-xs
              font-sand-bold
              text-headline-lg-mobile
              text-primary
            "
          >
            FREE
          </Text>
        </View>

        {/* Right */}

        <Button
          title="Publish Listing"
          size="lg"
          className="min-w-44"
        />
      </View>
    </View>
  );
}
const NewListing = () => {
  
  const form = useForm<NewListingForm>({
    defaultValues: {
      photos: [],
      title: "",
      category: "",
      type: "both",
      price: "",
      condition: "",
      description: "",
    },
  });
  return (
    // <View className="bg-surface flex  items-center h-screen">
    //   <Header />
    //   <View className="self-start m-sm">
    //     <Text className="font-sand-bold text-xl">Photos</Text>
    //   </View>
    //   <View className="w-full flex items-center">
    //     <Text className="font-sand-semi-bold text-sm text-on-primary-container capitalize self-start m-sm">
    //       LISTING TITLE
    //     </Text>
    //     <Input placeholder="e.g. Organic Chemistry, Calculator, lab Coat" />
    //   </View>
    //   <View className="w-full flex items-center mt-md">
    //     <Text className="font-sand-semi-bold text-sm text-on-primary-container capitalize self-start m-sm">
    //       CATEGORY
    //     </Text>
    //     <Input placeholder="adandank" />
    //   </View>
      
    // </View>

    <SafeAreaView className="flex-1 bg-background">
         <ScrollView>
   
           <PhotosSection control={form.control} />
   
           <TitleField control={form.control} />
   
           <CategoryField control={form.control} />
   
           <ListingTypeField control={form.control} />
   
           <PriceField control={form.control} />
   
           <ConditionField control={form.control} />
   
           <DescriptionField control={form.control} />
   
           <VerificationSection />
   
         </ScrollView>
   
         <Footer />
       </SafeAreaView>
  );
};

export default NewListing;
