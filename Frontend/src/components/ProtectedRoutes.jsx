/* eslint-disable react/prop-types */
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoutes = ({ isAuth }) => {
    return (
        // <Outlet/> will be <Route path='protected' element={<ProtectedPage />}></Route>
        isAuth ? <Outlet /> : <Navigate to={"login"} />
    );
};

// 👇️ define prop types for the component
ProtectedRoutes.propsTypes = {
    isAuth: PropTypes.node,
};

export default ProtectedRoutes;
