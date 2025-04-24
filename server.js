const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

// Waifu.im API details
const WAIFU_API_URL = "https://api.waifu.im/sfw/waifu/";
const API_TOKEN = "7qZmd6wMCZN811by0FZUsrMXXv4EouU-guFZVRknQCnwoWDbWSfEZ5_7AJDfbqYtLX-J8x0vwdpiGORiTcye2txEF753rhrxTXtACS-H9bNXJKzYIro3X7EU4WWmA6SL2Ohx8J5ppkYLlumTEqpexyb17jXKorXmHSwc6bFHIOg";

app.get("/api/waifu", async (req, res) => {
    try {
        const response = await axios.get(WAIFU_API_URL, {
            headers: { Authorization: `Bearer ${API_TOKEN}` }
        });

        if (response.data && response.data.images) {
            res.json({ image: response.data.images[0].url });
        } else {
            res.status(500).json({ error: "Failed to retrieve waifu image." });
        }
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: "Error fetching waifu image." });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Waifu Generator API running at http://localhost:${PORT}`));
