import { Image, Text, View } from "react-native";

import Card from "@/src/components/ui/Card";
import Badge from "./Badge";
import VerifiedBadge from "./VerifiedBadge";

export interface FeaturedListing {
  id: string;
  image: string;
  title: string;
  condition: string;
  seller: string;
  verified: boolean;
  price: string;
  type: "sell" | "rent";
}

interface Props {
  item: FeaturedListing;
  onPress?: () => void;
}

export default function FeaturedCard({
  item,
  onPress,
}: Props) {
  console.log(item.image)
  return (
    <Card onPress={onPress}>
      {/* Image */}

      <View className="relative bg-red-500">
        <Image
          source={{ uri: item.image }}
          className="h-56 w-full"
          resizeMode="cover"
        />

        <View className="absolute right-md top-md">
          <Badge
            title={item.type === "sell" ? "Sell" : "Rent"}
            variant={item.type}
          />
        </View>
      </View>

      {/* Content */}

      <View className="p-md">

        {/* Title + Price */}

        <View className="flex-row items-start justify-between">

          <Text
            numberOfLines={2}
            className="
              flex-1
              pr-md
              font-sand-bold
              text-title-md
              text-on-surface
            "
          >
            {item.title}
          </Text>

          <Text
            className="
              font-sand-bold
              text-price
              text-primary
            "
          >
            {item.price}
          </Text>

        </View>

        {/* Seller */}

        <View className="mt-sm flex-row items-center">

          <Text
            className="
              font-sand
              text-body-md
              text-outline
            "
          >
            {item.condition}
          </Text>

          <Text className="mx-xs text-outline">
            •
          </Text>

          <Text
            className="
              font-sand
              text-body-md
              text-outline
            "
          >
            {item.seller}
          </Text>

          {item.verified && (
            <VerifiedBadge />
          )}

        </View>

      </View>

    </Card>
  );
}