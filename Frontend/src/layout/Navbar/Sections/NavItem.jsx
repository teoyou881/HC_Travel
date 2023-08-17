import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../store/thunkFunctions";
import { AiOutlineShoppingCart } from "react-icons/ai";

const routes = [
    { to: "/login", name: "login", auth: false },
    { to: "/register", name: "register", auth: false },
    { to: "/product/upload", name: "upload", auth: true },
    {
        to: "/user/cart",
        name: "cart",
        auth: true,
        icon: <AiOutlineShoppingCart style={{ fontSize: "1.4rem" }} />,
    },
    { to: "/history", name: "history", auth: true },
    { to: "", name: "logout", auth: true },
];

const liCss = "py-2 text-center border-b-4 cursor-pointer";

function NavItem({ mobile }) {
    const isAuth = useSelector((state) => state.user?.isAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logoutUser()).then(() => {
            navigate("/");
        });
    };

    return (
        <ul
            className={`text-md justify-center w-full flex gap-4 ${
                mobile && "flex-col bg-gray-900 h-full"
            } items-center`}>
            {routes.map(({ to, name, auth, icon }) => {
                //Because you have different things to show to people who are logged in and people who are not
                if (isAuth !== auth) return null;
                if (name === "logout") {
                    return (
                        <li key={name} className={liCss}>
                            <Link onClick={handleLogout}>{name}</Link>
                        </li>
                    );
                } else if (icon) {
                    return (
                        <li
                            className="relative py-2 text-center border-b-4 cursor-pointer"
                            key={name}>
                            <Link to={to}>
                                {icon}
                                <span className="absolute top-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -right-3">
                                    {2}
                                </span>
                            </Link>
                        </li>
                    );
                } else {
                    return (
                        <li key={name} className={liCss}>
                            <Link to={to}>{name}</Link>
                        </li>
                    );
                }
            })}
        </ul>
    );
}

export default NavItem;
