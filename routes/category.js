const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");

router.get("/trending", async(req,res) => {
    let allListings = await Listing.find();
    res.render("category/trending.ejs", {allListings});
})

router.get("/rooms", async(req,res) => {
    let allListings = await Listing.find();
    res.render("category/rooms.ejs", {allListings});
});
router.get("/city", async(req,res) => {
    let allListings = await Listing.find();
    res.render("category/city.ejs", {allListings});
});
router.get("/mountain", async(req,res) => {
    let allListings = await Listing.find();
    res.render("category/mountain.ejs", {allListings});
});
router.get("/castle", async(req,res) => {
    let allListings = await Listing.find();
    res.render("category/castle.ejs", {allListings});
});
router.get("/pools", async(req,res) => {
    let allListings = await Listing.find();
    res.render("category/pools.ejs", {allListings});
});
router.get("/camp", async(req,res) => {
    let allListings = await Listing.find();
    res.render("category/camp.ejs", {allListings});
});
router.get("/farm", async(req,res) => {
    let allListings = await Listing.find();
    res.render("category/farm.ejs", {allListings});
});
router.get("/arctic", async(req,res) => {
    let allListings = await Listing.find();
    res.render("category/arctic.ejs", {allListings});
});
router.get("/dome", async(req,res) => {
    let allListings = await Listing.find();
    res.render("category/dome.ejs", {allListings});
});
router.get("/boats", async(req,res) => {
    let allListings = await Listing.find();
    res.render("category/boats.ejs", {allListings});
});


module.exports = router;