import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Types } from "../../store/user";

const RegisterPage = () => {
    const {
        //register() function to register each input field
        //handleSubmit() to handle the submit event fired by the form element.
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        // When defaultValues is not supplied to reset API, then HTML native reset API will be invoked to restore the form.
        reset,
    } = useForm({ mode: "onChange" });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector((state) => state.user.isLoading);

    const onSubmit = ({ email, password, name }) => {
        //alert(email);

        // const body = {
        //     email,
        //     password,
        //     name,
        //     image: "https://cdn.pixabay.com/photo/2018/01/21/14/16/woman-3096664_1280.jpg",
        // };

        // dispatch(registerUser(body))
        // .then(() => {
        //     navigate("/");
        // })
        // .catch(() => reset());
        // reset();
        dispatch({
            type: Types.REGISTER,
            email,
            password,
            name,
            image: "https://cdn.pixabay.com/photo/2018/01/21/14/16/woman-3096664_1280.jpg",
            navigate,
        });
        reset();
    };

    const userEmail = {
        required: "Enter your e-mail address",
        pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Wrong or invalid e-mail address. Please correct it and try again. ",
        },
    };

    const userPassword = {
        required: "Enter your password",
        minLength: {
            value: 6,
            message: "Minimum 6 characters required",
        },
    };
    const userName = {
        required: "Enter your name",
    };
    return (
        <section className="flex flex-col justify-center mt-20 max-w-lg m-auto ">
            <div className="p-6 bg-white rounded-md shadow-md">
                <h1 className="text-3xl font-semibold text-center">Create account</h1>
                <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-2">
                        <label htmlFor="email" className="text-sm font-semibold text-gray-800">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="xxx@email.com"
                            className="w-full px-4 py-2 mt-2 bg-white border rounded-md"
                            // ?? idk why it doesn't work
                            // aria-invalid={errors.email ? "true" : "false"}
                            {...register("email", userEmail)}
                        />
                        {errors?.email && (
                            <div>
                                <span className="text-red-500">{errors.email.message}</span>
                            </div>
                        )}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email" className="text-sm font-semibold text-gray-800">
                            Your name
                        </label>
                        <input
                            type="text"
                            id="Name"
                            placeholder="First and last name"
                            className="w-full px-4 py-2 mt-2 bg-white border rounded-md"
                            {...register("name", userName)}
                        />
                        {errors?.name && (
                            <div>
                                <span className="text-red-500">{errors.name.message}</span>
                            </div>
                        )}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="text-sm font-semibold text-gray-800">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="At least 6 characters"
                            className="w-full px-4 py-2 mt-2 bg-white border rounded-md"
                            {...register("password", userPassword)}
                        />
                        {errors?.password && (
                            <div>
                                <span className="text-red-500">{errors.password.message}</span>
                            </div>
                        )}
                    </div>
                    <div className="mt-6 ">
                        <button
                            type="submit"
                            /* This prevents duplicate form submissions.
                                If the form state is submitting, the button tag is disabled. 
                                When the event ends and isSubmitting is flase, 
                                disabled will also become false and the button will be re-enabled. */
                            disabled={isSubmitting}
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
                {isLoading && (
                    <div className="flex justify-center">
                        <p className="font-bold">Loading...</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default RegisterPage;
