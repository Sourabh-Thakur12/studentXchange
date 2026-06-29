import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import type { ComponentProps, ReactNode } from "react";
type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];


type Profile = {
  name: string;
  memberSince: string;
  rating: number;
  itemsSold: number;
  initials: string;
  bio: string;
};

type Listing = {
  id: string;
  title: string;
  price: string;
  tradeMode: "Both" | "Sell";
  icon: IconName;
  gradient: readonly [string, string];
};

type Feedback = {
  id: string;
  buyerName: string;
  buyerInitials: string;
  rating: number;
  comment: string;
};

// ─── Mock Data ────────────────────────────────────────────────────────────────

export const PROFILE: Profile = {
  name: "Alex Chen",
  memberSince: "2024",
  rating: 4.8,
  itemsSold: 12,
  initials: "AC",
  bio: "Computer Science Senior at State University. Mostly selling tech accessories and textbooks. Quick responder!",
};

export const LISTINGS: Listing[] = [
  { id: "1", title: "C ++ ke notes...", price: " 4 ", tradeMode: "Both", icon: "laptop", gradient: ["#7C3AED", "#4C1D95"] },
  { id: "2", title: "Manavi and KK photo album...", price: "free", tradeMode: "Sell", icon: "book-open-variant", gradient: ["#1D4ED8", "#1E3A5F"] },
  { id: "3", title: "suraj ki panty wo bhi used..", price: "1450", tradeMode: "Sell", icon: "headphones", gradient: ["#111827", "#374151"] },
  { id: "4", title: "briyani..", price: "370", tradeMode: "Both", icon: "keyboard", gradient: ["#6D28D9", "#2D1B69"] },
];

export const FEEDBACK: Feedback[] = [
  {
    id: "1",
    buyerName: "Jordan S.",
    buyerInitials: "JS",
    rating: 5,
    comment: '"Super fast response and the item was exactly as described. Thanks!"',
  },
];

