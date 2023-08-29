import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utills/axios";

function DetailProductPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await axiosInstance.get(`/products/${productId}?type=single`);
                console.log(response);
                setProduct(response.data[0]);
            } catch (e) {
                console.log(e);
            }
        }
    }, [productId]);

    return <div>DetailProductPage</div>;
}

export default DetailProductPage;
