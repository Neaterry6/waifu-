const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

const app = express();
app.use(cors());

// Serve static files from public/
app.use(express.static(path.join(__dirname, 'public')));

// Waifu.im API URL (no token needed)
const WAIFU_API_URL = "https://api.waifu.im/search";

// Categories
const categories = {
  versatile: [
    "maid",
    "waifu",
    "marin-kitagawa",
    "mori-calliope",
    "raiden-shogun",
    "oppai",
    "selfies",
    "uniform",
    "kamisato-ayaka"
  ],
  nsfw: [
    "ass",
    "hentai",
    "milf",
    "oral",
    "paizuri",
    "ecchi",
    "ero"
  ]
};

// Waifu fetch endpoint
app.get("/api/waifu", async (req, res) => {
  const tags = req.query.tags ? req.query.tags.split(",") : ["waifu"];
  const height = req.query.height || ">=2000";

  try {
    const response = await axios.get(WAIFU_API_URL, {
      params: { included_tags: tags, height: height }
    });

    if (response.data.images && response.data.images.length > 0) {
      res.json({
        image: response.data.images[0].url,
        tags: tags,
        height: height
      });
    } else {
      res.status(404).json({ error: "No waifu image found." });
    }
  } catch (error) {
    console.error("Error fetching waifu:", error);
    res.status(500).json({ error: "API request failed!" });
  }
});

// Categories endpoint
app.get("/api/categories", (req, res) => {
  res.json(categories);
});

// Root route (optional if serving static index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Waifu Generator API running at http://localhost:${PORT}`));
