import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../../store/thunkFunctions";

function CartPage() {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user?.userData);

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

    return <div>CartPage</div>;
}

export default CartPage;
