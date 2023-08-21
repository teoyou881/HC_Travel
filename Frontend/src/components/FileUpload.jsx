import React from "react";
import Dropzone from "react-dropzone";
import axiosInstance from "../utills/axios";
function FileUpload({ images, onImageChange }) {
    const handleDrop = async (files) => {
        // must use FormData when we pass file
        let formData = new FormData();
        const config = {
            // content type should be changed to multipart/form-data
            header: { "content-type": "multipart/form-data" },
        };
        formData.append("file", files[0]);

        try {
            const response = await axiosInstance.post("/products/image", formData, config);
            onImageChange([...images, response.data.fileName]);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (image) => {
        try {
            // in delete method, params should be object.
            // ex) params:{}
            // or if you want to wrap it within body?
            // DELETE requests are not designed to have a request body according to HTTP specifications.
            // ex)
            /*
            data: data,
            headers: {
                'Content-Type': 'application/json',
                'X-HTTP-Method-Override': 'DELETE' // Simulate DELETE request with data
            }
            */
            // But it's not a conventional approach. use post or put method.
            const response = await axiosInstance.delete("/products/image", {
                params: { image: image },
            });

            let newImages = [];
            newImages = images.filter((image) => image !== response.data);
            onImageChange(newImages);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex gap-4">
            <Dropzone onDrop={handleDrop}>
                {({ getRootProps, getInputProps }) => (
                    <section className="min-w-[300px] h-[300px] border flex items-center justify-center">
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p className="text-3xl">+</p>
                        </div>
                    </section>
                )}
            </Dropzone>

            <div className="flex-grow h-[300px] border flex items-center justify-center, overflow-x-scroll overflow-y-hidden">
                {images.map((image) => (
                    <div key={image} onClick={() => handleDelete(image)}>
                        <img
                            className="min-w-[300px] h-[300px]"
                            src={`${import.meta.env.VITE_SERVER_URL}/${image}`}
                            alt={image}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FileUpload;
