import React from "react";

const continents = [
    { key: 1, value: "Africa" },
    { key: 2, value: "Eutope" },
    { key: 3, value: "Asia" },
    { key: 4, value: "North America" },
    { key: 5, value: "South America" },
    { key: 6, value: "Australia" },
    { key: 7, value: "Antarctica" },
];

function UploadProductPage() {
    return (
        <section>
            <div className="text-center m-7">
                <h1>UploadProductPage</h1>
            </div>
            <form className="mt-6">
                <div className="mt-4">
                    <label htmlFor="title">Name</label>
                    <input
                        className="w-full px-4 py-2 bg-white border rounded-md"
                        name="title"
                        id="title"
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="description">Description</label>
                    <input
                        className="w-full px-4 py-2 bg-white border rounded-md"
                        name="description"
                        id="description"
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="price">Price</label>
                    <input
                        className="w-full px-4 py-2 bg-white border rounded-md"
                        type="number"
                        name="price"
                        id="price"
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="title">Continent</label>
                    <select
                        className="w-full px-4 mt-2 bg-white border rounded-md"
                        name="continent"
                        id="continent">
                        {continents.map((item) => (
                            <option key={item.key} value={item.key}>
                                {item.value}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mt-4">
                    <button className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800">
                        Create
                    </button>
                </div>
            </form>
        </section>
    );
}

export default UploadProductPage;
