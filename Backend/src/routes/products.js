const express = require("express");
const router = express.Router();
const auth = require("../middelware/auth");
const Product = require("../models/Product");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// to use cloudinary
const { cloudinary, cloudinaryStorage } = require("../../uploads");
// add public_id to cloudinaryStorage
// cloudinaryStorage.params.public_id = (req, file) => file.fieldname + "-" + Date.now(); // Generate a unique filename
// const uploadCloudinary = multer({ storage: cloudinaryStorage }).single("file");
const uploadCloudinary = multer({ storage: cloudinaryStorage }).array("images");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});
const upload = multer({ storage }).single("file");

router.post("/", auth, async (req, res, next) => {
    // TODO
    // Before saving the product to MongoDB, upload the file to cloudinary and get the URL information.
    let images = req.body.images;
    //const images = tempArr.map((image) => (image = path.join(__dirname, "../../uploads/" + image)));
    // console.log(images);
    // console.log(req.body.continent);

    // async, await code
    /* const uploadImagesSequentially = async () => {
        for (const image of images) {
            try {
                const result = await cloudinary.uploader.upload(image);
                console.log("Image uploaded successfully");
                console.log("Public URL:", result.url);
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };
    uploadImagesSequentially(); */
    // --> Promise.all is much more faster, So I decide use Promise.All
    let deleteArr = [];
    console.log("product router post / before  Promise.all ");
    Promise.all(
        images.map((image) => {
            const imageName = image.split(".")[0];
            console.log("imageName => ", imageName);
            image = path.join(__dirname, "../../uploads/" + image);

            // put each image into array should be deleted.
            deleteArr.push(image);
            return cloudinary.uploader.upload(image, {
                folder: "HC_Travel", // Cloudinary folder where the files will be stored
                public_id: Date.now() + imageName,
                transformation: [
                    //fill, thumb, limit, fit scale --> crop options
                    { width: 800, height: 600, crop: "limit" }, // Resize the image
                ],
                tags: [req.body.continent], // Tags to associate with the uploaded image
            });
        })
    )
        .then((results) => {
            console.log("Images uploaded successfully");
            console.log("=================each upload file info=================");
            // Log URLs of the uploaded images
            results.forEach((result) => console.log(result));
            const imageUrl = results.map((result) => result.url);

            //TODO
            /* 
        Put the fetched URL data into the req.body.images array.
        Call the delete method to delete the photos temporarily stored in the local uploads folder.
        */
            req.body.images = [...imageUrl];
            console.log(req.body);

            deleteArr.forEach((file) => {
                if (fs.existsSync(file)) {
                    try {
                        fs.unlinkSync(file);
                        console.log(file, " is deleted.");
                    } catch (error) {
                        console.log("deleteArr.forEach", error);
                        next(error);
                    }
                }
            });
        })
        .catch((error) => {
            console.error("Error uploading images:", error);
        });

    //When I'm done with todo, need to uncomment it.
    // try {
    //     const product = new Product(req.body);
    //     product.save();
    //     return res.sendStatus(201);
    // } catch (error) {
    //     next(error);
    // }
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
            res.send(imageName);
        } catch (error) {
            next(error);
        }
    }
});
module.exports = router;
