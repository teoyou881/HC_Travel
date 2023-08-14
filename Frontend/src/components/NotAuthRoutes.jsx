/* eslint-disable react/prop-types */
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const NotAuthRoutes = ({ isAuth }) => {
    return isAuth ? <Navigate to={"/"} /> : <Outlet />;
};

// 👇️ define prop types for the component
NotAuthRoutes.propsTypes = {
    isAuth: PropTypes.node,
};
export default NotAuthRoutes;
