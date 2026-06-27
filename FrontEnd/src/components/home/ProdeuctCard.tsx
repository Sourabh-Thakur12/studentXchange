import { Image, Text, View } from "react-native";

import Badge from "./Badge";
import Card from "@/src/components/ui/Card";
import VerifiedBadge from "./VerifiedBadge";

export interface ProductListing {
  id: string;
  image: string;
  title: string;
  condition: string;
  seller: string;
  verified: boolean;
  price: string;
  priceSuffix?: string;
  type: "sell" | "rent";
}

interface ProductCardProps {
  item: ProductListing;
  onPress?: () => void;
}

export default function ProductCard({
  item,
  onPress,
}: ProductCardProps) {
  return (
    <Card
      onPress={onPress}
      className="flex-row items-center max-h-32"
    >
      {/* Thumbnail */}

      <View className="relative max-w-32">

        <Image
          source={{ uri: item.image }}
          className="aspect-square h-full object-cover"
        />

        <View className="absolute top-sm">
          <Badge
            title={
              item.type === "sell"
                ? "Sell"
                : "Rent"
            }
            variant={item.type}
          />
        </View>

      </View>

      {/* Content */}

      <View className={'flex-1 justify-between p-md'}>

        {/* Title */}

        <View>

          <Text
            numberOfLines={2}
            className="
              font-sand-bold
              text-title-md
              text-on-surface
            "
          >
            {item.title}
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

        {/* Price */}

        <View className="mt-md flex-row items-end justify-between">

          <View />

          <View className="items-end">

            <Text
              className="
                font-sand-bold
                text-price
                text-primary
              "
            >
              {item.price}
            </Text>

            {!!item.priceSuffix && (
              <Text
                className="
                  font-sand
                  text-label-md
                  text-outline
                "
              >
                {item.priceSuffix}
              </Text>
            )}

          </View>

        </View>

      </View>

    </Card>
  );
}