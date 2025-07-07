import "../styles/home.css";
import "../styles/register.css";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { callApi } from "../utils/callApi";
import { useAuth } from "../context/AuthContext.tsx";
import Nav from "./Nav";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";

const SignupForm = () => {
  const navigate = useNavigate();
  const AuthContext = useAuth();
  const { setUserDetails } = AuthContext;
  const emailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const password = watch("password");
  const [showCPwd, setShowCPwd] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handleSignup: SubmitHandler<FieldValues> = async (data) => {
    const response = await callApi("/users/register", "POST", data);
    if (response.status === "success" && response.token) {
      // Storing the JWT
      localStorage.setItem("token", response.token);

      const userDeets = { ...response.data.user, loggedIn: true };
      setUserDetails(userDeets);
      navigate("/tasks/daily");
    } else {
      alert(response.response.data.message);
    }
  };

  return (
    <>
      <Nav />
      <div className="register-container">
        <h3 className="font-bold text-lg text-center register-txt">Sign Up</h3>
        <div className="signup-details">
          <form onSubmit={handleSubmit(handleSignup)}>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  validate: (value) => {
                    if (!emailRegex.test(value)) return "Invalid email";
                  },
                })}
              />
            </label>
            {errors.email && (
              <div className="text-red-500">{String(errors.email.message)}</div>
            )}
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Username"
                {...register("username", {
                  required: "username is required",
                  minLength: {
                    value: 4,
                    message: "username must have atleast 4 chars",
                  },
                })}
              />
            </label>
            {errors.username && (
              <div className="text-red-500">
                {String(errors.username.message)}
              </div>
            )}
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type={showPwd ? "text" : "password"}
                className="grow"
                placeholder="Password"
                {...register("password", {
                  required: "password is required (min 6 chars)",
                  minLength: {
                    value: 6,
                    message: "password must contain more than 5 chars",
                  },
                })}
              />
              <span onClick={() => setShowPwd(!showPwd)}>
                <IoEyeOutline />
              </span>
            </label>
            {errors.password && (
              <div className="text-red-500">
                {String(errors.password.message)}
              </div>
            )}
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type={showCPwd ? "text" : "password"}
                className="grow"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "confirm password cannot be empty",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              <span onClick={() => setShowCPwd(!showCPwd)}>
                <IoEyeOutline />
              </span>
            </label>
            {errors.confirmPassword && (
              <div className="text-red-500">
                {String(errors.confirmPassword.message)}
              </div>
            )}
            <button
              className="btn btn-success register-btn mt-4"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "....." : "Sign Up"}
            </button>
          </form>
          {!isMobile && (
            <div className="ambition-img">
              <img src="dist/images/ambition.avif" alt="goals" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SignupForm;
