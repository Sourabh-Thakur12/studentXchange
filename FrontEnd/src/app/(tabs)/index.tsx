
import { ScrollView, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

import HomeHeader from "@/src/components/home/HomeHeader";
import SearchBar from "@/src/components/home/SearchBar";
import CategoryList from "@/src/components/home/CategoryList";
import FeaturedCard from "@/src/components/home/FeaturedCard";
import ProductCard from "@/src/components/home/ProdeuctCard";
import SectionHeader from "@/src/components/common/SectionHeader";

const SafeAreaView = styled(RNSafeAreaView)

import {
  categories,
  featuredItem,
  productItems,
} from "@/src/constants/Home";
import { styled } from "nativewind";

export default function HomeScreen() {
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