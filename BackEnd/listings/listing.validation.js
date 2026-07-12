const { z } = require("zod");

const optionalPrice = z.number().int().nonnegative().optional();

const createListingSchema = z.object({
    title: z.string().trim().min(3).max(255),
    description: z.string().trim().min(10).max(5000),
    category: z.string().trim().min(2).max(100),
    condition: z.enum(["new", "like_new", "good", "fair", "poor"]),
    forSale: z.boolean(),
    sellPrice: optionalPrice,
    forRent: z.boolean(),
    rentPrice: optionalPrice,
    rentPeriod: z.enum(["day", "week", "month", "semester"]).optional(),
    rentAvailableAfter: z.coerce.date().optional(),
}).superRefine((listing, ctx) => {
    if (!listing.forSale && !listing.forRent) {
        ctx.addIssue({ code: "custom", path: ["forSale"], message: "A listing must be offered for sale or rent." });
    }
    if (listing.forSale && listing.sellPrice === undefined) {
        ctx.addIssue({ code: "custom", path: ["sellPrice"], message: "Sell price is required for sale listings." });
    }
    if (listing.forRent && listing.rentPrice === undefined) {
        ctx.addIssue({ code: "custom", path: ["rentPrice"], message: "Rent price is required for rental listings." });
    }
    if (listing.forRent && !listing.rentPeriod) {
        ctx.addIssue({ code: "custom", path: ["rentPeriod"], message: "Rent period is required for rental listings." });
    }
}).transform((listing) => ({
    ...listing,
    rentAvailableAfter: listing.rentAvailableAfter?.toISOString(),
}));

module.exports = { createListingSchema };
