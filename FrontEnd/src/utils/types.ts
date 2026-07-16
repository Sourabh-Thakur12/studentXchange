export type NewListingForm = {
  photos: string[];
  title: string;
  category: string;
  type: "sell" | "buy" | "both";
  price: string;
  condition: string;
  description: string;
};