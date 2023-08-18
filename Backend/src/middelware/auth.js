const jwt = require("jsonwebtoken");
const User = require("../models/User");
const refreshToken = require("./refreshToken");

let auth = async (req, res, next) => {
    // Get Token from request headers
    // !! authoriztion... check spelling..
    const authHeader = req.headers["authorization"];

    // Bearer htasocytnea8iosdgawsgesag.2342tgwegsgdsh.32yh3efgsdg
    const token = authHeader && authHeader.split(" ")[1];
    if (token === null) return res.sendStatus(401);
    try {
        // cehck token is valid

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: decode.userId });
        if (!user) {
            return res.status(400).send("user does not exist.");
        }

        req.user = user;
        req.accessToken = token;

        // console.log("auth", req.user);
        // return res.json({ user, accessToken });
        next();
    } catch (error) {
        // const decode = jwt.verify(refreshToken, process.env.JWT_SECRET);
        // const user = await User.findOne({ _id: decode.userId });
        // if (!user) {
        //     return res.status(400).send("user does not exist.");
        // }
        // req.user = user;
        // console.log("sdfghoussbdogbo");
        console.log(error);
        if (error instanceof jwt.TokenExpiredError || error instanceof jwt.JsonWebTokenError) {
            const de = jwt.decode(token);
            req.userId = de.userId;
            refreshToken(req, res, next);
        } else {
            next(error);
        }
    }
};

module.exports = auth;
