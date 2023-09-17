const { default: mongoose } = require("mongoose");

const PaymentShema = mongoose.Schema(
    {
        user: {
            type: Object,
        },
        data: {
            type: Array,
            default: [],
        },
        product: {
            type: Array,
            default: [],
        },
        image: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

const Payment = mongoose.model("Payment", PaymentShema);
module.exports = Payment;
