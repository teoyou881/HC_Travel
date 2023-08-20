import React from "react";
import Dropzone from "react-dropzone";

function FileUpload({ images, onImageChange }) {
    return (
        <div className="flex gap-4">
            <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
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
                    <div key={image}>
                        <img
                            className="min-w-[300px] h-[300px]"
                            src={`${import.meta.env.TIVE_SERVER_URL}/${image}`}
                            alt={image}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FileUpload;
