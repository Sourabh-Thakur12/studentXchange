const express = require("express");
const listingController = require("./listing.controller");
const authenticate = require("../shared/middlewares/authenticate");
const validate = require("../shared/middlewares/validate");
const { createListingSchema } = require("./listing.validation");

const router = express.Router();

<<<<<<< HEAD
router.post("/create", authenticate, validate({ body: createListingSchema }), listingController.createListing);
router.get("/get", authenticate, listingController.getListings);
=======
router.post("/", authenticate, validate({ body: createListingSchema }), listingController.createListing);
>>>>>>> f55c18d (create listings)

module.exports = router;
