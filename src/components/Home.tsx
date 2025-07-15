import "../styles/home.css";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

import { jwtDecode } from "jwt-decode";
import { callApi } from "../utils/callApi";
import type { CustomJWTPayload } from "../types/types";
import Nav from "./Nav";
import Slideshow from "./Slideshow";

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
    <>
      <Nav />
      <>
        <div className="bg-gray-50 text-gray-900">
          {/* Hero Section */}
          <section className="text-center py-20 px-4 lg:px-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Master Skills. Level Up. Dominate.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Skillbound helps you build habits, track learning, and gain XP to
              level up your life like an RPG.
            </p>
            <div className="flex justify-center gap-4">
              <button className="btn btn-primary px-6 py-3 text-lg">
                <a
                  href="https://www.youtube.com/results?search_query=create+a+system+for+life"
                  target="_blank"
                  className="text-2xl font-bold tracking-tight"
                >
                  How It Works
                </a>
              </button>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 px-6 bg-white grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-2">
                🧠 Learn Continuously
              </h3>
              <p className="text-gray-600">
                Track your daily progress in skills like health, knowledge, and
                productivity.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-2">
                ⚔️ Level-Up Mechanism
              </h3>
              <p className="text-gray-600">
                Gain XP and watch your level rise with every completed task or
                habit.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-2">📊 Track Stats</h3>
              <p className="text-gray-600">
                View dashboards for XP, skill points, streaks, and leaderboard
                standings.
              </p>
            </div>
          </section>

          {/* Screenshot Showcase */}
          <section className="py-16 bg-base-100 px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Your Journey, Visualized
            </h2>
            <Slideshow />
          </section>

          {/* Testimonials */}
          <section className="py-20 bg-white text-center px-4">
            <h2 className="text-3xl font-bold mb-10">What Users Are Saying</h2>
            <div className="grid gap-8 max-w-5xl mx-auto md:grid-cols-3">
              {[
                {
                  name: "Aarya",
                  role: "Med Student",
                  quote:
                    "I level up my day instead of just crossing off tasks.",
                },
                {
                  name: "Dev",
                  role: "Startup Founder",
                  quote: "Turning goals into XP is so satisfying.",
                },
                {
                  name: "Riya",
                  role: "Designer",
                  quote: "The leaderboard keeps me sharp and consistent.",
                },
              ].map(({ name, role, quote }) => (
                <div key={name} className="bg-gray-100 rounded-xl p-6 shadow">
                  <p className="text-gray-700 mb-2">“{quote}”</p>
                  <p className="font-semibold">{name}</p>
                  <p className="text-sm text-gray-500">{role}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <footer className="bg-black text-white py-16 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to start leveling up?
            </h2>
            <p className="mb-8 text-lg">
              Join Skillbound and build your real-life skill tree.
            </p>
            <button className="btn btn-primary text-lg px-8 py-3">
              <a
                href="https://www.youtube.com/results?search_query=create+a+system+for+life"
                target="_blank"
                className="text-2xl font-bold tracking-tight"
              >
                How It Works
              </a>
            </button>
            <p className="mt-6 text-sm text-gray-400">
              © {new Date().getFullYear()} Skillbound. All rights reserved.
            </p>
          </footer>
        </div>
      </>
    </>
  );
};

export default Home;
