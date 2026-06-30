import { View, Text } from "react-native";
import React, { useState } from "react";
import { Button } from "@/src/components/ui";
import { router } from "expo-router";

const Onboarding = () => {
  const [currentPage, setCurrentPage] = useState(1);

  function PageTemplate({ title, text, image}: { title: string; text: string; image: string }) {
    return (
      <View className="flex gap-2 mx-5 my-4">
        <View className="flex flex-row  items-center">
          <Text>{image}</Text>
        </View>
        <Text className="text-2xl font-sand-bold">{title}</Text>
        <Text>
          {text}
        </Text>
      </View>
    );
  }

  function Page1() {
    return (
      <PageTemplate title="Sell to Your Peers" text="turn your gently used textbooks, dorm decor, and electronics into
      cash. connect directly with your campus for safe, instant exchanges." image="logo placeholder" />
    );
  }

  function Page2() {
    return (
      <PageTemplate
        title="Rent and Reuse"
        text="Need a calculator for exam or a bike for the weekend? Rent items affordably from fellow students and contribute to an eco-friendly campus economy."
        image="logo placeholder" />
    );
  }

  function Page3() {
    return (
      <PageTemplate
        title="A Verified Community"
        text="Your safety is our priority. Everyone on campusXchange is verified student, creating a secure and trusted wallet garden for all your transactions."
        image="logo placeholder" />
    );
  }

  function handleNext() {
    if (currentPage >= 3) {
      router.replace("/(tabs)/inbox");
      return;
    } else {
      setCurrentPage((prv) => prv + 1);
    }
  }

  return (
    <View className="flex-1 bg-red-400 justify-between h-full">
      <View className="min-h-1/2 bg-red-400">
        <Text>image placeholder</Text>
      </View>

      <View className="min-h-1/2 justify-between z-2 rounded-t-4xl bg-surface">
      {currentPage === 1 && <Page1 />}
      {currentPage === 2 && <Page2 />}
      {currentPage === 3 && <Page3 />}

        <View className="flex flex-row justify-evenly my-6 items-center ">
          {currentPage !== 3 && <Button
            Title="Skip"
            variant="transparent"
            textColor="black"
            onPress={() => router.replace("/(tabs)/inbox")}
          />}
          <Button
            Title="Next"
            variant="primary"
            size="px-35 py-3"
            onPress={() => handleNext()}
          />
        </View>
      </View>
    </View>
  );
};

export default Onboarding;
