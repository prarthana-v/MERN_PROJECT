const express = require("express");
const router = express.Router();

// Temporary static banners
const banners = [
  {
    id: "1",
    title: "Summer Glow Essentials",
    subtitle: "Discover the secret to radiant skin this season.",
    image: "https://i.pinimg.com/1200x/ee/a0/0d/eea00d7ea62a6567be68d8c83303ef2a.jpg",
    link: "/shop"
  }
];

// GET all banners
router.get("/", (req, res) => {
  res.json(banners);
});

module.exports = router;
