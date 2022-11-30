import React, { useState } from "react";

function Administration() {
  const [car, setCar] = useState({
    car_make: "",
    car_model: "",
    car_year_model: "",
    color: "",
    city: "",
    descr: "",
    title: "",
    keyword: "",
  });

  const handleCar = (name, value) => {
    const newCar = { ...car };
    newCar[name] = value;
    setCar(newCar);
  };

  return (
    <div>
      <h1 className="text-3xl mb-4">Administration</h1>
      <form>
        <h2 className="text-2xl mb-4"> send a new car</h2>
        <div className="flex flex-wrap justify-evenly gap-5 mb-4">
          <label className="w-[40%] flex flex-col text-2xl">
            Créateur :
            <input
              required
              className=" bg-slate-300 placeholder-black p-2 rounded-3xl"
              type="text"
              name="car_make"
              value={car.car_make}
              placeholder="car make by"
              onChange={(e) => handleCar(e.target.name, e.target.value)}
            />
          </label>
          <label className="w-[40%] flex flex-col text-2xl">
            Model :
            <input
              required
              className=" bg-slate-300 placeholder-black p-2 rounded-3xl"
              type="text"
              name="car_model"
              value={car.car_model}
              placeholder="car model"
              onChange={(e) => handleCar(e.target.name, e.target.value)}
            />
          </label>
          <label className="w-[40%] flex flex-col text-2xl">
            Année du model :
            <input
              required
              className=" bg-slate-300 placeholder-black p-2 rounded-3xl"
              type="text"
              name="car_year_model"
              value={car.car_year_model}
              placeholder="year of creation"
              onChange={(e) => handleCar(e.target.name, e.target.value)}
            />
          </label>
          <label className="w-[40%] flex flex-col text-2xl">
            Couleur de la voiture :
            <input
              required
              className=" bg-slate-300 placeholder-black p-2 rounded-3xl"
              type="text"
              name="color"
              value={car.color}
              placeholder="car color"
              onChange={(e) => handleCar(e.target.name, e.target.value)}
            />
          </label>
          <label className="w-[40%] flex flex-col text-2xl">
            Origine de la voiture :
            <input
              required
              className=" bg-slate-300 placeholder-black p-2 rounded-3xl"
              type="text"
              name="city"
              value={car.city}
              placeholder="car city origin"
              onChange={(e) => handleCar(e.target.name, e.target.value)}
            />
          </label>
          <label className="w-[40%] flex flex-col text-2xl">
            titre :
            <input
              required
              className=" bg-slate-300 placeholder-black p-2 rounded-3xl"
              type="text"
              name="title"
              value={car.title}
              placeholder="car title"
              onChange={(e) => handleCar(e.target.name, e.target.value)}
            />
          </label>
          <label className="w-[40%] flex flex-col text-2xl">
            mots clée :
            <input
              required
              className=" bg-slate-300 placeholder-black p-2 rounded-3xl"
              type="text"
              name="keyword"
              value={car.keyword}
              placeholder="car keywords"
              onChange={(e) => handleCar(e.target.name, e.target.value)}
            />
          </label>
          <label className="w-[90%] flex flex-col text-2xl">
            description :
            <textarea
              required
              className=" bg-slate-300 placeholder-black p-2 rounded-3xl"
              type="text"
              name="descr"
              value={car.descr}
              placeholder="car description"
              onChange={(e) => handleCar(e.target.name, e.target.value)}
            />
          </label>
        </div>
        <button className=" justify-self-center" type="submit">
          send Form
        </button>
      </form>
    </div>
  );
}

export default Administration;
