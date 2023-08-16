import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavItem from "./Sections/NavItem";

function Navbar() {
    const [menu, setmenu] = useState(false);

    const handleMenu = () => {
        setmenu(!menu);
    };

    return (
        //relative is only for z index
        <section className="relative z-10 text-white bg-gray-900">
            <div className="w-full h-16">
                <div className="flex items-center justify-between mx-10">
                    {/* logo */}
                    {/* top-0 h-full -->  Make the height of the child element div 
                    dynamically change based on the height of the parent element */}
                    <div className="flex items-center text-2xl top-0 h-full">
                        <Link className="w-full" to="/">
                            <img className="h-16" src="../../../logo/logo_white.png" alt="logo" />
                        </Link>
                    </div>

                    {/* menu */}
                    <div className="text-2xl sm:hidden">
                        <button onClick={handleMenu}>{menu ? "-" : "+"}</button>
                    </div>

                    {/* nav-items large screen */}
                    {/* default is hidden. 
                    if width is wider than 640px, will be block display*/}
                    <div className="hidden sm:block">
                        <NavItem />
                    </div>
                </div>

                {/* nav-items-mobile */}
                <div className="block sm:hidden">{menu && <NavItem mobile />}</div>
            </div>
        </section>
    );
}

export default Navbar;
