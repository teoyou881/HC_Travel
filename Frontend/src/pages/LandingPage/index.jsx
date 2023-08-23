import React, { useState } from "react";
import CheckBox from "./Sections/CheckBox";
import RadioBox from "./Sections/RadioBox";
import SearchInput from "./Sections/SearchInput";
import CardItem from "./Sections/CardItem";

const LandingPage = () => {
    const limit = 4;
    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [filters, setFilters] = useState({
        continents: [],
        price: [],
    });

    return (
        <>
            <section>
                <div className="text-center m-7">
                    <h2 className="text-2xl"> HC Travel </h2>
                </div>

                {/* todo -> filter */}
                <div className="flex gap-3">
                    <div className="w-1/2">
                        <CheckBox />
                    </div>
                    <div className="w-1/2">
                        <RadioBox />
                    </div>
                </div>

                {/* todo -> search */}
                <div>
                    <SearchInput className="flex justify-end" />
                </div>

                {/* todo -> card */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-6 md:grid-cols-4">
                    {products.map((product) => (
                        <CardItem product={product} key={product._id} />
                    ))}
                </div>

                {/* todo -> load more */}
                {hasMore && (
                    <div className="flex justify-center mt-5">
                        <button className="px-3 py-1 mt-5 text-white bg-black rounded-md hover:bg-gray-800">
                            More
                        </button>
                    </div>
                )}
            </section>
        </>
    );
};

export default LandingPage;
