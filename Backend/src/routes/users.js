const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const auth = require("../middelware/auth");
const Product = require("../models/Product");
const crypto = require("crypto");
const Payment = require("../models/Payment");
const async = require("async");

router.post("/register", async (req, res, next) => {
    try {
        const user = new User(req.body);

        await user.save();
        return res.status(200).send({ isSuccess: true });
        // return new Error("nskfnkl");
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
    let num = Number(req.body.quantity);

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
            // In user cart, user want to update the quantity
            if (req.body.update === true) {
                const user = await User.findOneAndUpdate(
                    //find
                    { _id: req.user._id, "cart.id": req.body.productId },
                    //update
                    { $set: { "cart.$.quantity": num } },
                    //option
                    // new: true --> Returns the updated user.
                    { new: true }
                );
                const update = true;
                const cart = user.cart;
                return res.status(201).send({ cart, update });
            }

            const user = await User.findOneAndUpdate(
                //find
                { _id: req.user._id, "cart.id": req.body.productId },
                //update
                { $inc: { "cart.$.quantity": num } },
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
                            quantity: num,
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

router.post("/payment", auth, async (req, res, next) => {
    // Put simple payment info into history field in user collection
    let history = [];
    let transactionData = {};

    req.body.cartDetail.forEach((item) => {
        history.push({
            // International standard
            dateOfPurchase: new Date().toISOString(),
            name: item.title,
            id: item._id,
            price: item.price,
            quantity: item.quantity,
            paymentId: crypto.randomUUID(),
        });
    });

    // Put simple payment info into history field in user collection
    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
    };

    transactionData.product = history;

    // user collection
    /* why should use $each
        => if do not use, history enters the history document, once again wrapped in an array.
        ex) history[array[his,his,his,his]]
        => If use, ex) history[his,his,his]
        */
    await User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { history: { $each: history } }, $set: { cart: [] } },
        {}
    );

    //payment collection
    const payment = new Payment(transactionData);
    const paymentDocs = await payment.save();

    // console.log(paymentDocs);
    //   {
    //     user: {
    //       id: new ObjectId("64f57e1f9c94091bd05b7b7d"),
    //       name: '31412523',
    //       email: 'test@test.com'
    //     },
    //     data: [],
    //     product: [
    //       {
    //         dateOfPurchase: '2023-09-06T22:39:58.140Z',
    //         name: '2',
    //         id: '64f6576d29e34ffa35452bf4',
    //         price: 4213,
    //         quantity: 4,
    //         paymentId: 'cf983a11-fee5-4a23-8e40-127e5b93301f'
    //       },
    //       {
    //         dateOfPurchase: '2023-09-06T22:39:58.140Z',
    //         name: 'Aus',
    //         id: '64f6580429e34ffa35452c1a',
    //         price: 1699,
    //         quantity: 2,
    //         paymentId: 'ce571e8d-8d63-441e-a6ab-14877a054ea0'
    //       }
    //     ],
    //     _id: new ObjectId("64f8ffbe44dc8a8ebe8df57a"),
    //     createdAt: 2023-09-06T22:39:58.235Z,
    //     updatedAt: 2023-09-06T22:39:58.235Z,
    //     __v: 0
    //   }

    // Todo
    // increase quantity by the number of items sold
    let products = [];

    paymentDocs.product.forEach((item) => {
        products.push({ id: item.id, quantity: item.quantity });
    });

    async.eachSeries(
        products,
        async (item) => {
            await Product.updateOne(
                { _id: item.id },
                {
                    $inc: {
                        sold: item.quantity,
                    },
                }
            );
        },
        (error) => {
            if (error) return res.status(500).send(error);
            return res.sendStatus(200);
        }
    );
});

router.patch("/cart", auth, async (req, res, next) => {
    // try {
    //     const userInfo = await User.findOneAndUpdate(
    //         { _id: req.user._id },
    //         // use $pull to delete data in mongoDB
    //         { $pull: { cart: { id: req.query.productId } } },
    //         // get updated data
    //         { new: true }
    //     );
    //     const cart = userInfo.cart;
    //     const array = cart.map((item) => {
    //         return item.id;
    //     });
    //     // get all products that matches all id in array
    //     const productInfo = await Product.find({ _id: { $in: array } }).populate("writer");
    //     return res.json({
    //         productInfo,
    //         cart,
    //     });
    // } catch (error) {
    //     next(error);
    // }
    console.log(req.body);
});

module.exports = router;
