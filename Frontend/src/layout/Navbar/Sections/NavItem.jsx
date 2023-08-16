import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../store/thunkFunctions";

const routes = [
    { to: "/login", name: "login", auth: false },
    { to: "/register", name: "register", auth: false },
    { to: "", name: "logout", auth: true },
];

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
            {routes.map(({ to, name, auth }) => {
                //Because you have different things to show to people who are logged in and people who are not
                if (isAuth !== auth) return null;
                if (name === "logout") {
                    return (
                        <li key={name} className="py-2 text-center border-b-4 cursor-pointer">
                            <Link onClick={handleLogout}>{name}</Link>
                        </li>
                    );
                } else {
                    return (
                        <li key={name} className="py-2 text-center border-b-4 cursor-pointer">
                            <Link to={to}>{name}</Link>
                        </li>
                    );
                }
            })}
        </ul>
    );
}

export default NavItem;
