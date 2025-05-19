import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../store/thunkFunctions";
import { AiFillFilter } from "react-icons/ai";

let MAX = 10;

const ProductInfo = ({ product }) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const handleClick = () => {
        dispatch(addToCart({ productId: product._id, quantity }));
    };

    const makeOption = () => {
        let result = [];
        for (let i = 1; i < 11; i++) {
            result.push(<option key={i}>{i}</option>);
        }
        return result;
    };

    const handleOption = (e) => {
        // alert(e.target.value);
        setQuantity(e.target.value);
    };

    return (
        <div>
            <p className="text-xl text-bold">prodcut Info</p>

            <ul>
                <li>
                    <span className="font-semibold text-gray-900">price: </span>
                    {product.price}$
                </li>
                <li>
                    <span className="font-semibold text-gray-900">sold: </span>
                    {product.sold}
                </li>
                <li>
                    <span className="font-semibold text-gray-900">description: </span>
                    {product.description}
                </li>
            </ul>

            <div>
                <span>Quantity: </span>
                <select className="border" onChange={handleOption}>
                    {makeOption()}
                </select>
            </div>

            <div className="mt-3">
                <button
                    className="w-full px-4 py-2 text-white bg-black hover:bg-gray-800 rounded-md font-bold"
                    onClick={handleClick}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductInfo;
