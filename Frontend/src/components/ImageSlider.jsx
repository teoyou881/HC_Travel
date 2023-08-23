import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
const ImageSlider = ({ images }) => {
    return (
        <Carousel autoPlay interval={2000} showThumbs={false} infiniteLoop>
            {images.map((image) => (
                <div key={image}>
                    <img src={image} alt={image} />
                    {/* <p className="legend">Legend 1</p> */}
                </div>
            ))}
        </Carousel>
    );
};

export default ImageSlider;
