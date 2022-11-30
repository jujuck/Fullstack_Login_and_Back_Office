import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiConnexion from "@services/apiConnexion";

import validate from "@services/cars";

function CarModal({ carProps, getCar, id, handleDisplay }) {
  const navigate = useNavigate();
  const [car, setCar] = useState(carProps);
  const handleCars = (place, value) => {
    const newCars = { ...car };
    newCars[place] = value;
    setCar(newCars);
  };

  const deleteCar = () => {
    apiConnexion
      .delete(`/cars/${id}`)
      .then(() => navigate("/"))
      .catch((err) => console.error(err));
  };
  const sendForm = (e) => {
    const data = { ...car };
    delete data.id;
    e.preventDefault();
    if (validate(car))
      apiConnexion
        .put(`/cars/${id}`, data)
        .then(() => {
          getCar();
          handleDisplay();
        })
        .catch((err) => console.error(err));
  };

  return (
    <div className=" w-full h-full z-[1] absolute top-0 flex justify-center items-center  ">
      <form
        className="w-4/5 h-4/5 bg-slate-400 p-4 rounded-[5rem]"
        onSubmit={(e) => sendForm(e)}
      >
        <div className="flex justify-end">
          <button
            onClick={() => handleDisplay()}
            type="button"
            className="mr-8"
          >
            X
          </button>
        </div>
        <h2 className="text-2xl mb-4"> Edit this car</h2>
        <div className="flex flex-wrap justify-evenly gap-5 mb-4">
          <input
            required
            className="w-[40%] bg-slate-300 placeholder-black p-2 rounded-3xl"
            type="text"
            id="car_make"
            value={car.car_make}
            placeholder="car make by"
            onChange={(e) => handleCars(e.target.id, e.target.value)}
          />
          <input
            required
            className="w-[40%] bg-slate-300 placeholder-black p-2 rounded-3xl"
            type="text"
            id="car_model"
            value={car.car_model}
            placeholder="car model"
            onChange={(e) => handleCars(e.target.id, e.target.value)}
          />
          <input
            required
            className="w-[40%] bg-slate-300 placeholder-black p-2 rounded-3xl"
            type="text"
            id="car_year_model"
            value={car.car_year_model}
            placeholder="year of creation"
            onChange={(e) => handleCars(e.target.id, e.target.value)}
          />
          <input
            required
            className="w-[40%] bg-slate-300 placeholder-black p-2 rounded-3xl"
            type="text"
            id="color"
            value={car.color}
            placeholder="car color"
            onChange={(e) => handleCars(e.target.id, e.target.value)}
          />
          <input
            required
            className="w-[40%] bg-slate-300 placeholder-black p-2 rounded-3xl"
            type="text"
            id="city"
            value={car.city}
            placeholder="car city origin"
            onChange={(e) => handleCars(e.target.id, e.target.value)}
          />
          <input
            required
            className="w-[40%] bg-slate-300 placeholder-black p-2 rounded-3xl"
            type="text"
            id="title"
            value={car.title}
            placeholder="car title"
            onChange={(e) => handleCars(e.target.id, e.target.value)}
          />
          <input
            required
            className="w-[40%] bg-slate-300 placeholder-black p-2 rounded-3xl"
            type="text"
            id="keyword"
            value={car.keyword}
            placeholder="car keywords"
            onChange={(e) => handleCars(e.target.id, e.target.value)}
          />
          <textarea
            required
            className="w-[90%] bg-slate-300 placeholder-black p-2 rounded-3xl"
            type="text"
            id="descr"
            value={car.descr}
            placeholder="car description"
            onChange={(e) => handleCars(e.target.id, e.target.value)}
          />
        </div>
        <div className="flex justify-evenly mb-8">
          <button
            className=" bg-red-600 justify-self-center p-4 rounded-full"
            type="button"
            onClick={() => deleteCar()}
          >
            Delete Car
          </button>
          <button
            className=" bg-green-600 justify-self-center p-4 rounded-full"
            type="submit"
          >
            send Form
          </button>
        </div>
      </form>
    </div>
  );
}
export default CarModal;
