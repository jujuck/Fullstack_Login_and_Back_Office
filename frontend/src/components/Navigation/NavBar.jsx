import React from "react";
import { Link } from "react-router-dom";
import logo from "@assets/logo.png";

function NavBar({ user, handleUser }) {
  return (
    <header>
      <nav className="px-2 sm:px-4 mb-5 ">
        <div className="container flex flex-wrap justify-between items-center mr-auto ml-40">
          <Link to="/" class="flex items-center">
            <img
              src={logo}
              className="mx-3 h-32 sm:h-15"
              alt="Second hand sale cars Logo"
            />
          </Link>
          <div
            id="mobile-menu-2"
            className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
          >
            <ul className="flex flex-col p-4 mt-4 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
              <li>
                <Link
                  to="/"
                  class="block rounded-2xl p-5 m-2 text-gray-700 rounded hover:bg-zinc-200 text-xl"
                >
                  Accueil
                </Link>
              </li>
              <li>
                {user ? (
                  <button
                    type="button"
                    className="block rounded-2xl p-5 m-2 text-gray-700 rounded hover:bg-zinc-200 text-xl"
                    onClick={() => handleUser(null)}
                  >
                    Se Déconnecter
                  </button>
                ) : (
                  <Link
                    to="/Login"
                    class="block rounded-2xl p-5 m-2 text-gray-700 rounded hover:bg-zinc-200 text-xl"
                  >
                    Se Connecter
                  </Link>
                )}
              </li>
              {user?.role === "admin" && (
                <li>
                  <Link
                    to="/Administration"
                    class="block rounded-2xl p-5 m-2 text-gray-700 rounded hover:bg-zinc-200 text-xl"
                  >
                    Administration
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
