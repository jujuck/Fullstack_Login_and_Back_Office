import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import apiConnexion from "@services/apiConnexion";
import CarCard from "@components/CarCard";
import NavButton from "@components/Navigation/NavButton";

export default function Home() {
  const [cars, setCars] = useState([]);
  const [nbPages, setNbPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const page = parseInt(searchParams.get("page"), 10) || 1;
    apiConnexion
      .get(`/cars?page=${page}`)
      .then((json) => {
        setCars(json.data.cars);
        setNbPages(json.data.pages);
      })
      .catch((err) => console.error(err));
  }, [searchParams]);

  return (
    <div className="m-10">
      <h1 className="text-2xl text-center m-5">
        Welcome in the second hand world of Cars
      </h1>
      <div className="flex justify-center gap-1 m-auto">
        {new Array(nbPages).fill().map((_, index) => {
          return <NavButton index={index + 1} setPages={setSearchParams} />;
        })}
      </div>
      <div className="flex flex-wrap m-12">
        {cars.map((car) => {
          return <CarCard car={car} key={car.id} />;
        })}
      </div>
    </div>
  );
}
