import React from "react";
import { Link } from "react-router-dom";

function CarCard({ car }) {
  return (
    <div className="basis-1/6 border rounded p-4 m-2 shadow-sm hover:shadow-lg">
      <Link to={`/cars/${car.id}`}>
        <h3 className="text-xl m-2">{car.car_model}</h3>
        <h5>{car.city}</h5>
        <p className="hover:bg-zinc-200 hover:rounded">More info ...</p>
      </Link>
    </div>
  );
}

export default CarCard;
