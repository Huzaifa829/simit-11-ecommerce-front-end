import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Types for Form Inputs
interface LoginFormInputs {
  email: string;
  password: string;
}

interface SignUpFormInputs extends LoginFormInputs {
  name: string;
  confirmPassword: string;
}

// Validation Schemas
const loginSchema = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const signUpSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const Authentication: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs | SignUpFormInputs>({
    resolver: yupResolver(isLogin ? loginSchema : signUpSchema),
  });

  // Form Submission
  const onSubmit: SubmitHandler<LoginFormInputs | SignUpFormInputs> = (data) => {
    if (isLogin) {
      console.log("Login Data:", data);
      alert("Login Successful!");
    } else {
      console.log("Sign-Up Data:", data);
      alert("Sign-Up Successful!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field (Only for Sign-Up) */}
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                {...register("name" as keyof SignUpFormInputs)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
              {"name" in errors && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name?.message}
                </p>
              )}
            </div>
          )}

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Field (Only for Sign-Up) */}
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                {...register("confirmPassword" as keyof SignUpFormInputs)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password"
              />
              {"confirmPassword" in errors && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Toggle Between Login and Sign-Up */}
        <div className="mt-4 text-center">
          <p className="text-sm">
            {isLogin
              ? "Don't have an account? "
              : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-500 font-bold hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
