import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { callApi } from "../utils/callApi";
import { useAuth } from "../context/AuthContext.tsx";
import { IoEyeOutline } from "react-icons/io5";
import Nav from "./Nav.tsx";

const LoginForm = () => {
  const navigate = useNavigate();
  const AuthContext = useAuth();
  const { setUserDetails } = AuthContext;
  const [showPwd, setShowPwd] = useState(false);
  const emailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  const handleLogin: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await callApi("/users/login", "POST", data);
      if (response.status === "success") {
        setUserDetails(response.data);
        localStorage.setItem("token", response.token);
        navigate("/tasks/daily");
      }

      if (response.status === "fail") {
        setError("root", {
          message: "Invalid credentials!",
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <Nav />
      <div className="login-container">
        <div className="login-box">
          <h3 className="font-bold text-center login-txt">Login</h3>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="login-details flex flex-col">
              <label className="input input-bordered flex items-center gap-2 mb-4 mt-4">
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
              {errors.email?.message && (
                <div className="text-red-500">
                  {String(errors.email.message)}
                </div>
              )}

              <label className="input input-bordered flex items-center gap-2">
                <input
                  type={showPwd ? "text" : "password"}
                  className="grow"
                  placeholder="Password"
                  {...register("password", {
                    required: "Enter your password",
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
            </div>
            <button
              className="btn btn-success login-btn"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "hang on..." : "Login"}
            </button>
            {errors.root && (
              <div className="text-red-500">{errors.root.message}</div>
            )}
          </form>
          <div className="goals-img">
            <img src="dist/images/login-goals.png" alt="goals" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
