const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/latestNews", async (req, res) => {
  const options = {
    method: "GET",
    url: "https://bloomberg-market-and-financial-news.p.rapidapi.com/market/auto-complete",
    params: { query: "om" },
    headers: {
      "X-RapidAPI-Key": "464e9f8cf3msh84aa3920a405e42p103febjsn07eb74d2259f",
      "X-RapidAPI-Host": "bloomberg-market-and-financial-news.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    res.send(response);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
