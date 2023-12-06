import React, { useEffect, useState } from 'react';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import SearchInput from './Sections/SearchInput';
import CardItem from './Sections/CardItem';
import axiosInstance from '../../utills/axios';
import { continents, prices } from '../../utills/filterData';

const LandingPage = () => {
    const limit = 4;
    const [searchTerm, setSearchTerm] = useState('');
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
        searchTerm = '',
    }) => {
        const params = {
            skip,
            limit,
            filters,
            searchTerm,
        };

        try {
            console.log('params', params);
            const response = await axiosInstance.get('/products', { params });
            console.log('response data', response.data);
            if (loadMore) {
                setProducts([...products, ...response.data.products]);
            } else {
                setProducts(response.data.products);
            }
            setHasMore(response.data.hasMore);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLoadMore = () => {
        const body = {
            skip: skip + limit,
            limit,
            loadMore: true,
            filters,
            searchTerm,
        };
        fetchProducts(body);
        setSkip(skip);
    };

    const handleFilters = (newFilteredData, category) => {
        const newFilters = { ...filters };
        newFilters[category] = newFilteredData;

        if (category === 'price') {
            const priceValues = handlePrice(newFilteredData);
            newFilters[category] = priceValues;
        }

        showFilteredResults(newFilters);
        setFilters(newFilters);
    };

    const handlePrice = (value) => {
        let array = [];

        for (let key in prices) {
            if (prices[key]._id === parseInt(value, 10)) {
                array = prices[key].array;
            }
        }
        return array;
    };

    const showFilteredResults = (filters) => {
        const body = {
            skip: 0,
            limit,
            filters,
            searchTerm,
        };
        fetchProducts(body);
        setSkip(0);
    };

    const handleSearchTerm = (e) => {
        const body = {
            skip: 0,
            limit,
            filters,
            searchTerm: e.target.value,
        };
        setSkip(0);
        setSearchTerm(e.target.value);
        fetchProducts(body);
    };

    return (
        <>
            <section>
                <div className='text-center m-7'>
                    <h2 className='text-2xl'> HC Travel </h2>
                </div>

                {/* todo -> search */}
                <div className='flex justify-end  mb-3  '>
                    <SearchInput searchTerm={searchTerm} onSearch={handleSearchTerm} />
                </div>

                {/* todo -> filter */}
                <div className='flex gap-3'>
                    <div className='w-1/2'>
                        <CheckBox
                            continents={continents}
                            checkedContinents={filters.continents}
                            onFilters={(filters) => handleFilters(filters, 'continents')}
                        />
                    </div>
                    <div className='w-1/2'>
                        <RadioBox
                            prices={prices}
                            checkedPrice={filters.price}
                            onFilters={(filters) => handleFilters(filters, 'price')}
                        />
                    </div>
                </div>

                {/* todo -> card */}
                <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
                    {products.map((product) => (
                        <CardItem product={product} key={product._id} />
                    ))}
                </div>

                {/* todo -> load more */}
                {hasMore && (
                    <div className='flex justify-center mt-5'>
                        <button
                            className='px-3 py-1 mt-5 text-white bg-black rounded-md hover:bg-gray-800'
                            onClick={handleLoadMore}>
                            More
                        </button>
                    </div>
                )}
            </section>
        </>
    );
};

export default LandingPage;
