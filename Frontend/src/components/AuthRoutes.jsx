/* eslint-disable react/prop-types */
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

// <Outlet/> will be <Route path='protected' element={<ProtectedPage />}></Route>
const AutoRoutes = ({ isAuth }) => {
    return isAuth ? <Outlet /> : <Navigate to={"login"} />;
};

// 👇️ define prop types for the component
AutoRoutes.propsTypes = {
    isAuth: PropTypes.node,
};

export default AutoRoutes;
