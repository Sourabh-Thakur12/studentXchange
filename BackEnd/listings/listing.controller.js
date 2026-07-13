const listingService = require("./listing.service");
const ApiResponse = require("../shared/utils/apiResponse");

const createListing = async (req, res, next) => {
    try {
        const listing = await listingService.createListing(req.user.userId, req.body);
        return res.status(201).json(ApiResponse.success({ listing }, "Listing created successfully."));
    } catch (error) {
        return next(error);
    }
};

const getListings = async (req, res, next) => {
    try {
        const listings = await listingService.getListings();
        return res.status(200).json(ApiResponse.success({ listings }, "Listings retrieved successfully."));
    } catch (error) {
        return next(error);
    }
};

module.exports = { createListing, getListings };
