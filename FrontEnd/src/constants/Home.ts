export const categories = [
  {
    id: "books",
    label: "Books",
    icon: "📚",
  },
  {
    id: "tech",
    label: "Tech",
    icon: "💻",
  },
  {
    id: "hostel",
    label: "Hostel",
    icon: "🏠",
  },
  {
    id: "sports",
    label: "Sports",
    icon: "🏀",
  },
  {
    id: "more",
    label: "More",
    icon: "•••",
  },
];

export const featuredItem = {
  id: "1",

  title: "MacBook Pro M1 (2020) • 16GB RAM",

  condition: "Excellent",

  seller: "Sarah J.",

  verified: true,

  price: "$850",

  type: "sell" as const,

  image:
    "https://images.pexels.com/photos/3747070/pexels-photo-3747070.jpeg",
};

export const productItems = [
  {
    id: "2",

    title: "Advanced Calculus (8th Edition)",

    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200",

    seller: "Mike T.",

    verified: false,

    condition: "Good",

    type: "rent" as const,

    price: "$25",

    priceSuffix: "/month",
  },

  {
    id: "3",

    title: "Sony WH-1000XM4",

    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200",

    seller: "Elena R.",

    verified: true,

    condition: "Like New",

    type: "sell" as const,

    price: "$180",
  },
];