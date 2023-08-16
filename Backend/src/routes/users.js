const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const auth = require("../middelware/auth");

router.post("/register", async (req, res, next) => {
    try {
        const user = new User(req.body);

        const payload = {
            // MongoDB ID s object. so it has to be converted to string.  --> use toHexString
            userId: user._id.toHexString(),
        };

        const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "7d",
            issuer: "HC",
            audience: user.email,
        });
        user.refreshToken = refreshToken;
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
        };
        // token will be expired in 1 hour.
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
            issuer: "HC",
            audience: payload.userId,
        });
        const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "7d",
            issuer: "HC",
            audience: payload.userId,
        });
        return res.json({ user, accessToken });
    } catch (error) {
        next(error);
    }
});

router.get("/auth", auth, async (req, res, next) => {
    return res.json({
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        image: req.user.image,
    });
});

router.post("/logout", auth, async (req, res, next) => {
    try {
        return res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
