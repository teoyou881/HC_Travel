import React from "react";

const CartTable = ({ products, onRemoveItem }) => {
    const renderCartImage = (images) => {
        if (images.length > 0) {
            let image = images[0];
            return image;
        }
    };
    const makeOption = (quantity) => {
        let result = [];
        for (let i = 1; i < 11; i++) {
            if (i == quantity) {
                result.push(
                    <option key={i} value="default">
                        {i}
                    </option>
                );
            } else {
                result.push(<option key={i}>{i}</option>);
            }
        }
        return result;
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
                    <select defaultValue={"default"}>{makeOption(product.quantity)}</select>

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
