import React from "react";

const RegisterPage = () => {
    return (
        <section className="flex flex-col justify-center mt-20 max-w-lg m-auto ">
            <div className="p-6 bg-white rounded-md shadow-md">
                <h1 className="text-3xl font-semibold text-center">Create account</h1>
                <form className="mt-6">
                    <div className="mb-2">
                        <label htmlFor="email" className="text-sm font-semibold text-gray-800">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 mt-2 bg-white border rounded-md"
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email" className="text-sm font-semibold text-gray-800">
                            Your name
                        </label>
                        <input
                            type="text"
                            id="Name"
                            className="w-full px-4 py-2 mt-2 bg-white border rounded-md"
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="text-sm font-semibold text-gray-800">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 mt-2 bg-white border rounded-md"
                        />
                    </div>
                    <div className="mt-6 ">
                        <button
                            type="submit"
                            className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 duration-300">
                            Sign Up
                        </button>
                    </div>
                    <p className="mt-8 text-xs font-light text-center text-gray-700">
                        Already have an account? {"  "}
                        <a href="/login" className="font-medium hover:underline">
                            Sign in
                        </a>
                    </p>{" "}
                </form>
            </div>
        </section>
    );
};

export default RegisterPage;
