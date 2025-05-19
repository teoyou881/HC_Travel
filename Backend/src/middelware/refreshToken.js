const jwt = require("jsonwebtoken");
const User = require("../models/User");

let refreshToken = async (req, res, next) => {
    const userId = req.userId;

    /*     const token = authHeader && authHeader.split(" ")[1];
    Above code doesn't exist. accessToken has prefix 'Bearer '
    So, we need to use split(). However, refreshToken is just token. */
    const userReToken = req.headers["refreshtoken"];
    if (userReToken === null) return res.sendStatus(401);

    try {
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(400).send("user does not exist.");
        }
        const refreshToken = user.refreshToken;
        // if userReToken is valid..

        jwt.verify(userReToken, process.env.REFRESH_TOKEN_SECRT);
        // Verify that the token in the database matches the token the current user has
        // create new accessToken
        if (userReToken === refreshToken) {
            const payload = {
                userId: user._id.toHexString(),
                time: new Date(),
            };
            const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "1h",
                issuer: "HC",
                audience: user.email,
            });

            req.user = user;
            req.accessToken = accessToken;
            console.log("get new refreshToek");
            next();
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = refreshToken;
