const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res, next) => {
    // console.log("/register");
    try {
        const user = new User(req.body);
        await user.save();
        return res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

router.get("/", async (req, res) => {
    console.log("get");
});

module.exports = router;
