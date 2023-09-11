import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCartItem } from "../../../store/thunkFunctions";

const CartTable = ({ products, onRemoveItem }) => {
    const dispatch = useDispatch();
    const renderCartImage = (images) => {
        if (images.length > 0) {
            let image = images[0];
            return image;
        }
    };
    const makeOption = (quantity) => {
        const result = [];
        for (let i = 1; i < 11; i++) {
            if (i === Number(quantity)) {
                result.push(
                    <option key={i} value={i}>
                        {i}
                    </option>
                );
            } else {
                result.push(
                    <option key={i} value={i}>
                        {i}
                    </option>
                );
            }
        }
        return result;
    };
    const handleQuantityChange = (e) => {
        const quantity = e.target.value;
        dispatch(updateCartItem({ quantity }));
    };

    const renderItems =
        products.length > 0 &&
        products.map((product) => (
            <tr key={product._id}>
                <td>
                    {/* products.images=[12312,412314,12314] 
                    Among them, I will use first iamge
                    Check if there is no images in product*/}
                    <img
                        className="w-[160px]"
                        src={renderCartImage(product.images)}
                        alt="product"
                    />
                </td>
                <td>{product.title}</td>
                <td>{product.quantity}</td>
                <td>{product.price} $</td>
                <td>
                    <select
                        id="quantitySelect"
                        value={product.quantity}
                        onChange={handleQuantityChange}>
                        {makeOption(product.quantity)}
                    </select>

                    <button onClick={() => onRemoveItem(product._id)}> Delete</button>
                </td>
            </tr>
        ));

    return (
        <table className="w-full text-sm text-left">
            <thead className=" border-[1px]">
                <tr>
                    <th>Imgae</th>
                    <th>Title</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>{renderItems}</tbody>
        </table>
    );
};

export default CartTable;
