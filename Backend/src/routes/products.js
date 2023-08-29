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
    Promise.all(
        images.map((image) => {
            // extract only imageName without extension like .jpg
            const imageName = image.split(".")[0];
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
            // console.log("Images uploaded successfully");
            // console.log("=================each upload file info=================");

            // Log URLs of the uploaded images
            const imageUrl = results.map((result) => result.url);

            //TODO
            /* 
        Put the fetched URL data into the req.body.images array.
        Call the delete method to delete the photos temporarily stored in the local uploads folder.
        */
            req.body.images = [...imageUrl];
            // console.log(req.body);

            deleteArr.forEach((file) => {
                if (fs.existsSync(file)) {
                    try {
                        fs.unlinkSync(file);
                        // console.log(file, " is deleted.");
                    } catch (error) {
                        console.log("deleteArr.forEach", error);
                        next(error);
                    }
                }
            });
        })
        .catch((error) => {
            console.error("Error uploading images:", error);
        })
        .then(() => {
            const product = new Product(req.body);
            product.save();
            return res.sendStatus(201);
        })
        .catch((error) => {
            next(error);
        });

    /****************************************************************************/
    // I met problem req.body.images didn't changed.
    // url data was in images but When I checked products db, only filename was in there.
    // That was because I didn't do chaning...
    // the process I make product and save it must be in then()...

    //When I'm done with todo, need to uncomment it.
    // try {
    //     console.log(req.body)
    //     const product = new Product(req.body);
    //     product.save();
    //     return res.sendStatus(201);
    // } catch (error) {
    //     next(error);
    // }
    /****************************************************************************/
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
            // console.log(file, " is deleted.");
            res.send(imageName);
        } catch (error) {
            next(error);
        }
    }
});

router.get("/", async (req, res, next) => {
    // www.enfksnf.com/product?abc=abc
    // ==> req.query.abc is abc..
    // object in params is the same as above..
    const order = req.query.order ? req.query.order : "desc";
    const sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    const limit = req.query.limit ? Number(req.query.limit) : 20;
    const skip = req.query.skip ? Number(req.query.skip) : 0;
    const term = req.query.searchTerm;

    let findArgs = {};
    for (let key in req.query.filters) {
        if (req.query.filters[key].length > 0) {
            if (key === "price") {
                findArgs[key] = {
                    // Greater than equal
                    $gte: req.query.filters[key][0],
                    // Less than equal
                    $lte: req.query.filters[key][1],
                };
            } else {
                findArgs[key] = req.query.filters[key];
            }
        }
    }

    if (term) {
        findArgs["$text"] = { $search: term };
    }

    console.log(findArgs);
    try {
        const products = await Product.find(findArgs)
            .populate("writer")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit);

        // to check whether more button should be needed
        const productsTotal = await Product.countDocuments(findArgs);
        const hasMore = skip + limit < productsTotal ? true : false;

        return res.status(200).json({
            products,
            hasMore,
        });
    } catch (error) {
        next(error);
    }
});
module.exports = router;
