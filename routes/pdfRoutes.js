const express = require("express");
const pdfParse = require("pdf-parse");
const multer = require("multer");

const router = express.Router();
const upload = multer(); // Koristimo memorijsko skladištenje za PDF

router.post("/", upload.single("pdf"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    try {
        const data = await pdfParse(req.file.buffer);
        res.json({
            numPages: data.numpages,
            wordCount: data.text.split(/\s+/).length,
            tableOfContents: [], // Ovaj deo možeš unaprediti
            imageCount: 0 // Treba dodatna logika za brojanje slika
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to process PDF" });
    }
});

module.exports = router;