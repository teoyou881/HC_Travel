const express = require("express");
const router = express.Router();
const auth = require("../middelware/auth");
const Product = require("../models/Product");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const upload = multer({ storage: storage }).single("file");

router.post("/", auth, async (req, res, next) => {
    try {
        const product = new Product(req.body);
        product.save();
        return res.sendStatus(201);
    } catch (error) {
        next(error);
    }
});

router.post("/image", auth, async (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return req.status(500).send(err);
        }
        return res.json({ fileName: res.req.file.filename });
    });
});

router.delete("/image", auth, async (req, res, next) => {
    // console.log("products router delete /image");
    // console.log(req.query.image);
    const imageName = req.query.image;

    const file = path.join(__dirname, "../../uploads/" + imageName);

    if (fs.existsSync(file)) {
        try {
            fs.unlinkSync(file);
            console.log(file, " is deleted.");
        } catch (error) {
            next(error);
        }
    }

    // upload(req, res, (err) => {
    //     if (err) {
    //         return req.status(500).send(err);
    //     }
    //     return res.json({ fileName: res.req.file.filename });
    // });
});

module.exports = router;
