//REFACTOR thIS monsTROSITY
import { View, Text, ScrollView } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

import { NewListingForm } from "@/src/utils/types";

import { Card, Button } from "@/components/ui/index";

import {
  PhotosSection,
  TitleField,
  CategoryField,
  ListingTypeField,
  PriceField,
  DescriptionField,
  ConditionField,
} from "@/components/index";

const SafeAreaView = styled(RNSafeAreaView);

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

  const onSubmit = (data: NewListingForm) => {
    console.log(JSON.stringify(data,null,2));
  }
  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header />
      <FormProvider {...form}>
        <ScrollView className="m-sm">
          <PhotosSection />

          <TitleField />

          <CategoryField />

          <ListingTypeField />

          <PriceField />

          <ConditionField />

          <DescriptionField />

          <VerificationSection />
        </ScrollView>

        <Footer onSubmit={onSubmit } />
      </FormProvider>
    </SafeAreaView>
  );
};

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
          <Ionicons name="shield-checkmark" size={24} color="#3c6a00" />
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
            Your listing will be marked as verified once you're authenticated
            with your college email.
          </Text>

          <View className="mt-md flex-row items-center">
            <Ionicons name="checkmark-circle" size={18} color="#3c6a00" />

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

type props = {
  onSubmit: (data:any) => void;
}
function Footer({onSubmit}: props) {
const { handleSubmit } = useFormContext<NewListingForm>();
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

        <Button Title="Publish Listing" classname="min-w-44 rounded-sm" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}

export default NewListing;
