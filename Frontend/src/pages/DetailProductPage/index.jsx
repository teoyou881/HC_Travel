import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utills/axios";
import ProductImage from "./Sections/ProductImage";
import ProductInfo from "./Sections/ProductInfo";

function DetailProductPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // if this function is out side,
        // productId should be undefined.
        // because this function will be done before productId get value through useParams().
        async function fetchProduct() {
            try {
                const response = await axiosInstance.get(`/products/${productId}?type=single`);
                // console.log(response);
                // console.log(response.data);
                setProduct(response.data[0]);
            } catch (e) {
                console.log(e);
            }
        }
        fetchProduct();
    }, [productId]);

    if (!product) return null;

    return (
        <section>
            <div className="text-center">
                <h1 className="p-4 text-2xl">{product?.title}</h1>
            </div>
            <div className="flex gap-4">
                <div className="w-1/2">
                    {/* todo -> ProductImage */}
                    <ProductImage product={product} />
                </div>
                <div className="w-1/2">
                    {/* todo -> ProductInfo */}
                    <ProductInfo product={product} />
                </div>
            </div>
        </section>
    );
}

export default DetailProductPage;
