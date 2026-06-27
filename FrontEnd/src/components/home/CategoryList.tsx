import { ScrollView } from "react-native";
import CategoryChip from "./CategoryChip";

interface Category {
  id: string;
  icon: string;
  label: string;
}

interface Props {
  categories: Category[];
}

export default function CategoryList({
  categories,
}: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingRight: 8,
      }}
    >
      {categories.map((category, index) => (
        <CategoryChip
          key={category.id}
          icon={category.icon}
          label={category.label}
          active={index === 0}
        />
      ))}
    </ScrollView>
  );
}