import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";

const ProductImage = ({ product }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (product.images?.length > 0) {
            let images = [];

            product.images.map((imageName) => {
                return images.push({
                    original: imageName,
                    thumbnail: imageName,
                });
            });
            setImages(images);
        }
    }, [product]);

    return <ImageGallery items={images} slideDuration={1000} />;
};

export default ProductImage;
