const jwt = require("jsonwebtoken");
const User = require("../models/User");

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
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = auth;
