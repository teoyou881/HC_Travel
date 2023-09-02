import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../../store/thunkFunctions";
import CartTable from "./Sections/CartTable";

function CartPage() {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user?.userData);
    const cartDetail = useSelector((state) => state.user?.cartDetail);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let cartItemIds = [];

        // Check there is product in cart in user state
        if (userData?.cart) {
            if (userData.cart.length > 0) {
                userData.cart.forEach((item) => {
                    cartItemIds.push(item.id);
                });
                const body = {
                    cartItemIds,
                    userCart: userData.cart,
                };
                dispatch(getCartItems(body));
            }
        }
    }, [dispatch, userData]);

    useEffect(() => {}, [cartDetail]);

    const calculateTotal = (cartProducts) => {
        let totalPrice = 0;
        cartProducts.map((product) => (totalPrice += product.price * product));
        setTotal(total);
    };

    const handlePaymentClick = () => {};

    const handleRemoveCartItem = () => {};

    return (
        <section>
            <div className="text-center m-7">
                <h2 className="text-2xl">Shopping Cart</h2>
            </div>

            {cartDetail?.length > 0 ? (
                <>
                    <CartTable products={cartDetail} onRemoveItem={handleRemoveCartItem} />
                    <div className="mt-10">
                        <p>
                            <span className="font-bold">Total:</span> {total} $
                        </p>
                        <button
                            className="text-white bg-black hover:bg-gray-500 rounded-lg px-4 py-2 mt-5"
                            onClick={handlePaymentClick}>
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            ) : (
                <p> Your HC Cart is empty.</p>
            )}
        </section>
    );
}

export default CartPage;
