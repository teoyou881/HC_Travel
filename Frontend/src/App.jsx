import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage/index";
import RegisterPage from "./pages/RegisterPage/index";
import LandingPage from "./pages/LandingPage/index";
import NotAuthRoutes from "./components/NotAuthRoutes";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "./store/thunkFunctions";
import { useEffect } from "react";
import ProtectedPage from "./pages/ProtectedPage";

function Layout() {
    return (
        <div className="flex flex-col justify-between h-screen">
            <ToastContainer position="bottom-right" theme="light" pauseOnHover autoClose={1500} />

            <Navbar />
            <main className="mb-auto w-10/12 max-w-4xl mx-auto">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

function App() {
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.user?.isAuth);
    const temp = useSelector((state) => state.user.userData.user?.email);
    const refreshToken = useSelector((state) => state.user.userdata?.refreshToken);
    let email = "";
    if (temp !== undefined) {
        email = temp;
    }
    const user = {
        email,
        refreshToken,
    };

    const { pathname } = useLocation;

    useEffect(() => {
        if (isAuth) {
            dispatch(authUser(user));
        }
    }, [isAuth, pathname, dispatch, user]);

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* Paths you can take regardless of login  */}
                <Route index element={<LandingPage />}></Route>

                {/* ex */}
                <Route element={<ProtectedRoutes isAuth={isAuth} />}>
                    <Route path="protected" element={<ProtectedPage />}></Route>
                </Route>

                {/* Paths that can't be taken by logged in users */}
                <Route element={<NotAuthRoutes isAuth={isAuth} />}>
                    <Route path="/login" element={<LoginPage />}></Route>
                    <Route path="/register" element={<RegisterPage />}></Route>
                </Route>

                {/* Paths that only signed-in people can take */}
                {/* todo */}
                {/* <Route element={<ProtectedRoutes/>}>
                    <Route path='/product/upload' element={<UploadProductPage/>}/>
                    <Route path='/product/:productId' element={<DetailProductPage/>}/>
                    <Route path='/history' element={<HistoryPage/>}/>
                    <Route path='/user/cart' element={<CartPage/>}/>
                </Route> */}
            </Route>
        </Routes>
    );
}

export default App;
