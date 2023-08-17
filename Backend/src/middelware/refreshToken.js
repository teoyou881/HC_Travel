const jwt = require("jsonwebtoken");
const User = require("../models/User");

let refreshToken = async (req, res, next) => {
    const userId = req.userId;

    try {
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(400).send("user does not exist.");
        }
        const refreshToken = user.refreshToken;
        // if refreshToken is valid..
        // create new accessToken
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRT);
        const payload = {
            userId: user._id.toHexString(),
            time: new Date(),
        };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "10s",
            issuer: "HC",
            audience: payload.userId,
        });
        return res.json({ user, accessToken });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = refreshToken;
