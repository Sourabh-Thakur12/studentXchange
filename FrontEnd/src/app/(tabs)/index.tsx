
import { ScrollView, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

import HomeHeader from "@/src/components/home/HomeHeader";
import SearchBar from "@/src/components/home/SearchBar";
import CategoryList from "@/src/components/home/CategoryList";
import FeaturedCard from "@/src/components/home/FeaturedCard";
import ProductCard from "@/src/components/home/ProdeuctCard";
import SectionHeader from "@/src/components/common/SectionHeader";
import { api } from "@/src/utils/apiClient";
import * as SecureStore from 'expo-secure-store'

const SafeAreaView = styled(RNSafeAreaView)

import {
  categories,
  featuredItem,
  productItems,
} from "@/src/constants/Home";
import { styled } from "nativewind";
import { useEffect } from "react";

export default async function HomeScreen() {
  // const items = await api.get("/listings/get", "eyJpZCI6IjZhNTUyNzBhMDAxYmE0NjUwY2Q2Iiwic2VjcmV0IjoiYTg2NTg3NmIwMDE0NDU5NWE4ZjUzMzcxYTc1YzgxNzE5ZjkyNGI1YmQ2NDI0NzYwYzFjZGUxM2I5YzI3ZWE1ZWMwYWM3ZmEwNmM2NTk1NjlhYjUwZjgxZjU5ZGE3MWFhMDA0NzE5ZjhhM2VmZGY3YTQ0YTlhN2IwZGY5MGUyNmUzMjg1NTYyNWFhNzAwYzkwMTNiYTEyZjI2NTFmODk4YTg0YjA0ZjY2MWYwMmE5NGYzYTE3ZjdhM2Y4NGNiY2QxMjU5MTA2YzBlYTUzYWY4MGIyZGFkOGNhOGYxNjg1YmU4ODA3NmQxMmM5MjY5MmYxNzk0OTA0MWMwODcyNjI0NSJ9");
  // console.log(items);

  const sessionSecret = await SecureStore.getItemAsync("sessionSecret")

  useEffect(() => {
    const fetchData = async () => {
      const items = await api.get("/listings/get", sessionSecret)
      console.log(items)
    };
    fetchData();
  }, [])
  

  return (
    <SafeAreaView
      edges={[""]}
      className="flex-1 bg-surface-low"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-md pt-md pb-10"
      >
        {/* Header */}
        <HomeHeader />

        {/* Search */}
        <View className="mt-lg">
          <SearchBar />
        </View>

        {/* Categories */}
        <View className="mt-lg">
          <CategoryList categories={categories} />
        </View>

        {/* Featured */}
        <View className="mt-xl">
          <SectionHeader
            title="Featured"
            action="View All"
          />
        </View>

        <View className="mt-md">
          <FeaturedCard
            item={featuredItem}
          />
        </View>

        {/* Listings */}

        <View className="mt-lg gap-md">
          {productItems.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}