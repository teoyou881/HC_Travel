import React from "react";
import { useState } from "react";
import { produce } from "immer";
import { useSelector } from "react-redux";
import axiosInstance from "./../../utills/axios";
import { useNavigate } from "react-router-dom";
import FileUpload from "../../components/FileUpload";

const continents = [
    { key: 1, value: "Africa" },
    { key: 2, value: "Europe" },
    { key: 3, value: "Asia" },
    { key: 4, value: "North America" },
    { key: 5, value: "South America" },
    { key: 6, value: "Australia" },
    { key: 7, value: "Antarctica" },
];

function UploadProductPage() {
    const [product, setProduct] = useState({
        title: "",
        description: "",
        price: 0,
        continents: 1,
        images: [],
    });

    const userId = useSelector((state) => state.user?.userData._id || state.user?.userData.id);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name);
        // console.log(value);
        // setProduct((prevState) => ({
        //     ...prevState,
        //     [name]: value,
        // }));

        // use immer library
        setProduct(
            produce((draft) => {
                // get keys from product object..
                // Find the product property with the same name as the one passed in from the target.
                const arr = Object.keys(draft);
                const targetToUpdate = arr.find((target) => target === name);

                // console.log("setProduct produce ==>  ", targetToUpdate);
                // console.log(value);

                //if it exists, change the value.
                if (targetToUpdate) {
                    draft[targetToUpdate] = value;
                }
            })
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const images = product.images;
        let formData = new FormData();
        const config = {
            // content type should be changed to multipart/form-data
            header: { "content-type": "multipart/form-data" },
        };
        formData.append("images", images);

        // to do
        // Create data and send it to the backend.
        // console.log(product);

        //const { title, description, price, images, continents } = product;
        // console.log(product.continents);
        // console.log(continents);
        // console.log(continents[product.continents]);
        const body = {
            formData,
            config,
            writer: userId,
            ...product,
            continent: continents[product.continents - 1].value,
        };

        try {
            const result = await axiosInstance.post("/products", body);
            //console.log("uploadProductPage handleSubmit ==>  ", result);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    const handleImages = (newImages) => {
        // setProduct((prevState)=>({
        //     ...prevState,
        //     images:newImages
        // }))

        setProduct(
            produce((draft) => {
                draft.images = newImages;
            })
        );
    };

    return (
        <section>
            <div className="text-center m-7">
                <h1>UploadProductPage</h1>
            </div>
            <form className="mt-6" onSubmit={handleSubmit}>
                <FileUpload images={product.images} onImageChange={handleImages} />
                <div className="mt-4">
                    <label htmlFor="title">Title</label>
                    <input
                        className="w-full px-4 py-2 bg-white border rounded-md"
                        name="title"
                        id="title"
                        value={product.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="description">Description</label>
                    <input
                        className="w-full px-4 py-2 bg-white border rounded-md"
                        name="description"
                        id="description"
                        value={product.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="price">Price</label>
                    <input
                        className="w-full px-4 py-2 bg-white border rounded-md"
                        type="number"
                        name="price"
                        id="price"
                        value={product.price}
                        onChange={handleChange}
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="title">Continents</label>
                    <select
                        className="w-full px-4 mt-2 bg-white border rounded-md"
                        name="continents"
                        id="continents"
                        value={product.continents}
                        onChange={handleChange}>
                        {continents.map((item) => (
                            <option key={item.key} value={item.key}>
                                {item.value}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mt-4">
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800">
                        Create
                    </button>
                </div>
            </form>
        </section>
    );
}

export default UploadProductPage;
