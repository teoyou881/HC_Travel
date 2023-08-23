import React, { useEffect, useState } from "react";
import CheckBox from "./Sections/CheckBox";
import RadioBox from "./Sections/RadioBox";
import SearchInput from "./Sections/SearchInput";
import CardItem from "./Sections/CardItem";
import { registerUser } from "./../../store/thunkFunctions";
import axiosInstance from "../../utills/axios";

const LandingPage = () => {
    const limit = 4;
    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [filters, setFilters] = useState({
        continents: [],
        price: [],
    });

    useEffect(() => {
        fetchProducts({ skip, limit });
    }, []);

    const fetchProducts = async ({
        skip,
        limit,
        loadMore = false,
        filters = {},
        searchTerm = "",
    }) => {
        const params = {
            skip,
            limit,
            filters,
            searchTerm,
        };

        try {
            const response = await axiosInstance.get("/products", { params });
            setProducts(response.data.products);
        } catch (error) {
            console.log(error);
        }
    };

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
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
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
