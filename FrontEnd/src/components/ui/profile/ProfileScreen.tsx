import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import type { ComponentProps, ReactNode } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { C, s } from "./style";
import {PROFILE , LISTINGS, FEEDBACK} from "./temp.data"
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



// ─── Primitives ───────────────────────────────────────────────────────────────

function Avatar({ initials, size = "md" }: { initials: string; size?: "sm" | "md" }) {
  const isSmall = size === "sm";
  return (
    <LinearGradient colors={[C.avatarA, C.avatarB]} style={isSmall ? s.avatarSm : s.avatarMd}>
      <Text style={isSmall ? s.avatarInitialSm : s.avatarInitialMd}>{initials}</Text>
    </LinearGradient>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <View style={s.stars}>
      {Array.from({ length: 5 }, (_, i) => (
        <FontAwesome key={i} name="star" size={10} color={i < rating ? C.starFilled : C.starEmpty} />
      ))}
    </View>
  );
}

function Badge({ mode }: { mode: "Both" | "Sell" }) {
  return (
    <View style={mode === "Both" ? s.badgeBoth : s.badgeSell}>
      <Text style={mode === "Both" ? s.badgeTextBoth : s.badgeTextSell}>{mode}</Text>
    </View>
  );
}

function Divider() {
  return <View style={s.divider} />;
}

function SectionHeader({ title, action }: { title: string; action?: string }) {
  return (
    <View style={s.sectionHeader}>
      <Text style={s.sectionTitle}>{title}</Text>
      {action && <Text style={s.sectionAction}>{action}</Text>}
    </View>
  );
}

function Stat({ label, children }: { label: string; children: ReactNode }) {
  return (
    <View style={s.statBlock}>
      {children}
      <Text style={s.statLabel}>{label}</Text>
    </View>
  );
}

// ─── Composed Blocks ──────────────────────────────────────────────────────────

function ProfileAvatar({ initials }: { initials: string }) {
  return (
    <View style={{ marginBottom: 8 }}>
      <LinearGradient colors={[C.ringA, C.ringB]} style={s.avatarRing}>
        <Avatar initials={initials} />
        <View style={s.verifiedBadge}>
          <Ionicons name="checkmark" size={12} color="#fff" />
        </View>
      </LinearGradient>
    </View>
  );
}

function ProfileSummaryCard({ profile }: { profile: Profile }) {
  return (
    <View style={s.summaryCard}>
      <ProfileAvatar initials={profile.initials} />
      <Text style={s.name}>{profile.name}</Text>
      <Text style={s.memberSince}>Member since {profile.memberSince}</Text>

      <Divider />

      <View style={s.statsRow}>
        <Stat label="Avg Rating">
          <View style={[s.row, { alignItems: "center", gap: 3 }]}>
            <Text style={s.statValue}>{profile.rating.toFixed(1)}</Text>
            <FontAwesome name="star" size={12} color={C.starFilled} />
          </View>
        </Stat>
        <View style={s.vertDivider} />
        <Stat label="Items Sold">
          <Text style={s.statValue}>{profile.itemsSold}</Text>
        </Stat>
      </View>

      <Divider />

      <Text style={s.bio}>{profile.bio}</Text>
    </View>
  );
}

function ListingCard({ listing }: { listing: Listing }) {
  return (
    <View style={s.listingCard}>
      <LinearGradient colors={listing.gradient as [string, string]} style={s.productArt}>
        <Badge mode={listing.tradeMode} />
        <MaterialCommunityIcons name={listing.icon} size={46} color="#F9FAFB" />
      </LinearGradient>
      <View style={s.listingInfo}>
        <Text numberOfLines={2} style={s.listingTitle}>{listing.title}</Text>
        <Text style={s.listingPrice}>{listing.price}</Text>
      </View>
    </View>
  );
}

function FeedbackCard({ feedback }: { feedback: Feedback }) {
  return (
    <View style={s.feedbackCard}>
      <Avatar initials={feedback.buyerInitials} size="sm" />
      <View style={s.flex1}>
        <View style={s.feedbackMeta}>
          <Text style={s.feedbackName}>{feedback.buyerName}</Text>
          <Stars rating={feedback.rating} />
        </View>
        <Text style={s.feedbackComment}>{feedback.comment}</Text>
      </View>
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export function ProfileScreen({
  profile = PROFILE,
  listings = LISTINGS,
  feedback = FEEDBACK,
}: {
  profile?: Profile;
  listings?: Listing[];
  feedback?: Feedback[];
}) {
  const router = useRouter();

  return (
    <SafeAreaView edges={["top"]} style={s.safeArea}>
      <View style={s.container}>

        {/* Header */}
        <View style={s.header}>
          <Pressable
            style={s.backBtn}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={() => router.canGoBack() && router.back()}
          >
            <Ionicons name="arrow-back" size={20} color={C.primary} />
          </Pressable>
          <Text style={s.headerTitle}>Profile</Text>
          <Avatar initials={profile.initials} size="sm" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 12, paddingBottom: 40, backgroundColor: C.bg }}
          style={{ backgroundColor: C.bg }}
        >
          <ProfileSummaryCard profile={profile} />

          <SectionHeader title={`Active Listings (${listings.length})`} action="View All" />
          <View style={s.listingGrid}>
            {listings.map((l) => <ListingCard key={l.id} listing={l} />)}
          </View>

          <SectionHeader title="Recent Feedback" />
          {feedback.map((f) => <FeedbackCard key={f.id} feedback={f} />)}
        </ScrollView>

      </View>
    </SafeAreaView>
  );
}