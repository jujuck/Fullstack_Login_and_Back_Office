import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import apiConnexion from "@services/apiConnexion";

function Cars() {
  const [car, setCar] = useState();
  const { id } = useParams();

  useEffect(() => {
    apiConnexion
      .get(`/cars/${id}`)
      .then((json) => setCar(json.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {car && (
        <div className="m-16 p-12 border rounded-xl shadow-xl">
          <h1 className="text-2xl">{car.title}</h1>
          <h2>Model :{car.car_model}</h2>
          <h4>Constructor: {car.car_make}</h4>
          <h5>
            Year: {car.car_year_model} / Color: {car.color}
          </h5>
          <p>{car.descr}</p>
          <p>
            {car.keyword} / city : {car.city}
          </p>
        </div>
      )}
    </div>
  );
}

export default Cars;
