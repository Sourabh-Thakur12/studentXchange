const { ID, TablesDB, adminClient, appwriteConfig } = require("../../shared/config/appwrite");

const tablesDB = new TablesDB(adminClient);
const now = new Date().toISOString();
const samples = [
    ["Engineering Mathematics Textbook", "Clean copy with a few useful notes in pencil.", "Books", "good", true, 350, false],
    ["Scientific Calculator", "Working Casio calculator with protective hard cover.", "Electronics", "like_new", true, 700, false],
    ["Bicycle", "Well-maintained bicycle suitable for daily campus travel.", "Transport", "good", true, 4500, true, 150, "day"],
    ["Lab Coat", "White cotton lab coat, size medium, freshly washed.", "Clothing", "good", true, 300, false],
    ["Badminton Racket", "Lightweight racket with a recently replaced grip.", "Sports", "good", false, null, true, 100, "day"],
    ["Study Table Lamp", "Adjustable LED desk lamp with three brightness levels.", "Furniture", "like_new", true, 550, false],
    ["DSA Reference Book", "Data structures reference book in excellent condition.", "Books", "like_new", true, 450, true, 80, "week"],
    ["Bluetooth Speaker", "Compact rechargeable speaker with clear sound output.", "Electronics", "fair", true, 600, true, 120, "day"],
    ["Hostel Mattress", "Single-bed foam mattress used for one semester only.", "Furniture", "good", true, 1200, false],
    ["Cricket Kit", "Bat, pads and gloves packed together in a carry bag.", "Sports", "good", false, null, true, 400, "week"],
];

async function seedListings() {
    for (let index = 0; index < samples.length; index += 1) {
        const [title, description, category, condition, forSale, sellPrice, forRent, rentPrice, rentPeriod] = samples[index];
        const data = {
            sellerId: `dummy-seller-${(index % 3) + 1}`,
            title, description, category, condition, createdAt: now, updatedAt: now,
            forSale, forRent,
            ...(forSale ? { sellPrice, sellStatus: "available" } : {}),
            ...(forRent ? { rentPrice, rentPeriod, rentStatus: "available" } : {}),
        };
        await tablesDB.createRow({ databaseId: appwriteConfig.databaseId, tableId: appwriteConfig.listingsTableId, rowId: ID.unique(), data });
    }
    console.log("Created 10 dummy listings.");
}

seedListings().catch((error) => {
    console.error("Failed to seed listings:", error.message);
    process.exitCode = 1;
});
