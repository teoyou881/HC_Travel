const { default: mongoose } = require("mongoose");

const ProductSchema = mongoose.Schema({
    // References the user ID value.
    // The user's id value is ObjectId('~~~~').
    writer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        maxLength: 30,
    },
    description: String,
    price: {
        type: Number,
        default: 0,
    },
    images: {
        type: Array,
        default: [],
    },
    sold: {
        type: Number,
        default: 0,
    },
    continents: {
        type: Number,
        default: 1,
    },
    continent: {
        type: String,
    },
    views: {
        type: Number,
        default: 0,
    },
});

//  https://www.mongodb.com/docs/atlas/atlas-search/tutorial/partial-match/
ProductSchema.index(
    {
        title: "text",
        description: "text",
    },
    {
        weights: {
            title: 5,
            description: 1,
        },
    }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
