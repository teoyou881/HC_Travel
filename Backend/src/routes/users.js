const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const auth = require("../middelware/auth");
const Product = require("../models/Product");

router.post("/register", async (req, res, next) => {
    try {
        const user = new User(req.body);

        await user.save();
        return res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

router.post("/login", async (req, res, next) => {
    // req.body email, password
    try {
        // check whether user is exist or not
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send("Auth failed, email not found");
        }
        // check password is correct
        // must use user not User. use instance of User
        const isMatch = await user.comparePassword(req.body.password);
        if (!isMatch) {
            return res.status(400).send("Wrong Password");
        }

        const payload = {
            // MongoDB ID s object. so it has to be converted to string.  --> use toHexString
            userId: user._id.toHexString(),
            time: new Date(),
        };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
            issuer: "HC",
            audience: user.email,
        });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRT, {
            expiresIn: "7d",
            issuer: "HC",
            audience: user.email,
        });
        user.refreshToken = refreshToken;

        await user.save();

        // const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
        //     expiresIn: "7d",
        //     issuer: "HC",
        //     audience: payload.userId,
        // });
        return res.json({ user, accessToken });
    } catch (error) {
        next(error);
    }
});

router.get("/auth", auth, async (req, res, next) => {
    const user = {
        _id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        image: req.user.image,
        cart: req.user.cart,
        history: req.user.history,
    };

    return res.json({
        user,
        accessToken: req.accessToken,
    });
});
router.post("/logout", auth, async (req, res, next) => {
    try {
        return res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

router.post("/cart", auth, async (req, res, next) => {
    try {
        // Get the user's information in the user collection
        const userInfo = await User.findOne({ _id: req.user._id });

        // Check the info to see if the cart already contains the product that I have to save
        let duplicate = false;
        userInfo.cart.forEach((item) => {
            if (item.id === req.body.productId) {
                duplicate = true;
            }
        });

        // In cart, there is already the product
        if (duplicate) {
            const user = await User.findOneAndUpdate(
                //find
                { _id: req.user._id, "cart.id": req.body.productId },
                //update
                { $inc: { "cart.$.quantity": 1 } },
                //option
                // new: true --> Returns the updated user.
                { new: true }
            );

            return res.status(201).send(user.cart);
        }

        // In cart, there is no product that I want to save
        else {
            const user = await User.findOneAndUpdate(
                { _id: req.user._id },
                {
                    $push: {
                        cart: {
                            id: req.body.productId,
                            quantity: 1,
                            date: Date.now(),
                        },
                    },
                },
                { new: true }
            );
            return res.status(201).send(user.cart);
        }
    } catch (error) {
        next(error);
    }
});

router.delete("/cart", auth, async (req, res, next) => {
    try {
        const userInfo = await User.findOneAndUpdate(
            { _id: req.user._id },
            // use $pull to delete data in mongoDB
            { $pull: { cart: { id: req.query.productId } } },
            // get updated data
            { new: true }
        );
        const cart = userInfo.cart;
        const array = cart.map((item) => {
            return item.id;
        });
        // get all products that matches all id in array
        const productInfo = await Product.find({ _id: { $in: array } }).populate("writer");
        return res.json({
            productInfo,
            cart,
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
