import "../styles/home.css";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext.tsx";

import { jwtDecode } from "jwt-decode";
import { callApi } from "../utils/callApi";
import { CustomJWTPayload } from "../types/types";
import Navbar from "../components/Navbar";

const Home = () => {
  const AuthContext = useAuth();
  const { setUserDetails } = AuthContext;

  useEffect(() => {
    (async () => {
      const jwt = localStorage.getItem("token");
      let userId = "";

      if (jwt) {
        userId = jwtDecode<CustomJWTPayload>(jwt).id;
        if (userId) {
          const verifyUser = await callApi("/home", "GET", {});
          if (verifyUser.status === "success") {
            setUserDetails(verifyUser.data);
          }
        }
      }
    })();
  }, []);

  return (
    <div className="home">
      <Navbar />
      <div className="banner-container">
        <img src="dist/images/banner.jpg" alt="" className="landing-image" />
        <h2 className="heading">
          Motivation is temporary; <br /> Discipline is permanent.
        </h2>
      </div>
      <footer className="footer footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>
            {" "}
            Created with ❤️ by{" "}
            <a href="https://github.com/shakesbeer2049" target="_blank">
              Sheikh Zubair
            </a>{" "}
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Home;
