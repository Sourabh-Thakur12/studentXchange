import { StyleSheet } from "react-native";

// ─── Colors ───────────────────────────────────────────────────────────────────

export const C = {
  primary: "#7C3AED",
  primaryLight: "#EDE9FE",
  primaryText: "#5B21B6",
  avatarA: "#C4B5FD",
  avatarB: "#A78BFA",
  ringA: "#F9FAFB",
  ringB: "#DDD6FE",
  bg: "#F5F3FF",
  surface: "#FFFFFF",
  surfaceTint: "#F5F3FF",
  border: "#E5E7EB",
  textPrimary: "#111827",
  textSecondary: "#6B7280",
  starFilled: "#C4B5FD",
  starEmpty: "#E5E7EB",
  verified: "#7C3AED",
  bothBg: "#EDE9FE",
  bothText: "#5B21B6",
  sellBg: "#F3E8FF",
  sellText: "#7C3AED",
} as const;

// ─── Styles ───────────────────────────────────────────────────────────────────

export const s = StyleSheet.create({
  flex1: { flex: 1 },
  row: { flexDirection: "row" },
  center: { alignItems: "center", justifyContent: "center" },
  safeArea: { flex: 1, backgroundColor: C.bg },
  container: { flex: 1, backgroundColor: C.surface, maxWidth: 430, alignSelf: "center", width: "100%" },

  // Header
  header: { height: 48, flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: C.bg, paddingHorizontal: 8, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: C.border },
  headerTitle: { fontSize: 13, fontWeight: "700", color: C.primary },
  backBtn: { height: 44, width: 44, alignItems: "center", justifyContent: "center" },

  // Avatar
  avatarRing: { height: 78, width: 78, borderRadius: 39, alignItems: "center", justifyContent: "center" },
  avatarMd: { height: 64, width: 64, borderRadius: 32, alignItems: "center", justifyContent: "center" },
  avatarSm: { height: 32, width: 32, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  avatarInitialMd: { fontSize: 18, fontWeight: "700", color: "#3B0764" },
  avatarInitialSm: { fontSize: 10, fontWeight: "700", color: "#3B0764" },
  verifiedBadge: { position: "absolute", bottom: 5, right: 4, height: 22, width: 22, borderRadius: 11, borderWidth: 2, borderColor: C.surface, backgroundColor: C.verified, alignItems: "center", justifyContent: "center" },

  // Summary card
  summaryCard: { marginBottom: 16, borderRadius: 12, borderWidth: StyleSheet.hairlineWidth, borderColor: C.border, backgroundColor: C.surface, alignItems: "center", paddingHorizontal: 16, paddingBottom: 16, paddingTop: 24, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  name: { fontSize: 18, fontWeight: "700", color: C.textPrimary },
  memberSince: { marginTop: 2, fontSize: 11, color: C.textSecondary },
  divider: { width: "100%", backgroundColor: C.border, marginVertical: 16, height: StyleSheet.hairlineWidth },
  statsRow: { width: "100%", flexDirection: "row", alignItems: "center" },
  statBlock: { flex: 1, alignItems: "center", gap: 2 },
  statValue: { fontSize: 12, fontWeight: "700", color: C.primary, fontVariant: ["tabular-nums"] },
  statLabel: { fontSize: 9, fontWeight: "700", color: C.textSecondary, textTransform: "uppercase", letterSpacing: 0.5 },
  vertDivider: { width: StyleSheet.hairlineWidth, height: 28, backgroundColor: C.border },
  bio: { alignSelf: "stretch", textAlign: "left", fontSize: 11, color: C.textSecondary, lineHeight: 16 },

  // Section header
  sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", minHeight: 28, marginBottom: 8 },
  sectionTitle: { fontSize: 12, fontWeight: "700", color: C.textPrimary },
  sectionAction: { fontSize: 10, fontWeight: "700", color: C.primary },

  // Listing grid
  listingGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: 8, marginBottom: 16 },
  listingCard: { width: "48.5%", borderRadius: 10, borderWidth: StyleSheet.hairlineWidth, borderColor: C.border, backgroundColor: C.surface, overflow: "hidden", shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  productArt: { height: 88, alignItems: "center", justifyContent: "center" },
  badgeBoth: { position: "absolute", top: 6, left: 6, borderRadius: 99, paddingHorizontal: 8, paddingVertical: 2, backgroundColor: C.bothBg },
  badgeSell: { position: "absolute", top: 6, left: 6, borderRadius: 99, paddingHorizontal: 8, paddingVertical: 2, backgroundColor: C.sellBg },
  badgeTextBoth: { fontSize: 9, fontWeight: "700", color: C.bothText },
  badgeTextSell: { fontSize: 9, fontWeight: "700", color: C.sellText },
  listingInfo: { padding: 8, gap: 4 },
  listingTitle: { minHeight: 34, fontSize: 11, fontWeight: "600", color: C.textPrimary, lineHeight: 16 },
  listingPrice: { fontSize: 14, fontWeight: "700", color: C.primary, fontVariant: ["tabular-nums"] },

  // Feedback card
  feedbackCard: { flexDirection: "row", alignItems: "flex-start", gap: 10, borderRadius: 10, borderWidth: StyleSheet.hairlineWidth, borderColor: C.border, backgroundColor: C.surfaceTint, padding: 14, marginBottom: 8, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 2, elevation: 1 },
  feedbackMeta: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 6 },
  feedbackName: { fontSize: 11, fontWeight: "700", color: C.textPrimary },
  feedbackComment: { fontSize: 11, color: C.textSecondary, lineHeight: 16 },
  stars: { flexDirection: "row", gap: 2 },
});