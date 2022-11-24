import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import apiConnexion from "@services/apiConnexion";
import User from "@context/User";
import logo from "@assets/logo.png";

function Login() {
  const [connexion, setConnexion] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const userContext = useContext(User.UserContext);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setMessage("");
    const emailPattern = /^[^s@]+@[^s@]+.[^s@]+$/;
    const pwdPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
    if (
      emailPattern.test(connexion.email) &&
      pwdPattern.test(connexion.password)
    ) {
      apiConnexion
        .post("/login", { ...connexion })
        .then((res) => {
          navigate("/");
          userContext.handleUser(res.data);
        })
        .catch((err) => {
          setMessage(err.response.data);
        });
    } else {
      setMessage("Invalid credentials");
    }
  };
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-32 w-auto"
            src={logo}
            alt="Second hand sale cars logo"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Se connecter à l'espace d'administration
          </h2>
        </div>
        <form className="mt-8 space-y-6">
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                value={connexion.email}
                onChange={(e) =>
                  setConnexion({ ...connexion, email: e.target.value })()
                }
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <br />
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={connexion.password}
                onChange={(e) =>
                  setConnexion({ ...connexion, password: e.target.value })
                }
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <p>{message}</p>
          <div>
            <button
              type="button"
              onClick={handleSubmit}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-zinc-700 py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-zinc-500 group-hover:text-zinc-200"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
