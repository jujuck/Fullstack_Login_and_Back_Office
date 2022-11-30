const validateCar = (data) => {
  if (data.car_make.length < 3 || typeof data.car_make !== "string") {
    return {
      status: false,
      errorMessage: "3 caractere minimum sur le champ car make",
    };
  }
  if (data.car_model.length < 3 || typeof data.car_model !== "string") {
    return {
      status: false,
      errorMessage: "3 caractere minimum sur le champ car models",
    };
  }
  if (
    data.car_year_model.length !== 4 ||
    typeof data.car_year_model !== "string"
  ) {
    return {
      status: false,
      errorMessage:
        "4 caractere minimum et maximum sur le champ car year models",
    };
  }
  if (data.color.length < 3 || typeof data.color !== "string") {
    return {
      status: false,
      errorMessage: "3 caractere minimum sur le champ car make",
    };
  }
  if (data.color.length < 3 || typeof data.color !== "string") {
    return {
      status: false,
      errorMessage: "3 caractere minimum sur le champ car make",
    };
  }
  if (data.city.length < 3 || typeof data.city !== "string") {
    return {
      status: false,
      errorMessage: "3 caractere minimum sur le champ car city",
    };
  }
  if (data.descr.length < 10 || typeof data.descr !== "string") {
    return {
      status: false,
      errorMessage: "10 caractere minimum sur le champ car description",
    };
  }
  if (data.title.length < 10 || typeof data.title !== "string") {
    return {
      status: false,
      errorMessage: "10 caractere minimum sur le champ car title",
    };
  }
  if (data.keyword.length < 4 || typeof data.keyword !== "string") {
    return {
      status: false,
      errorMessage: "3 caractere minimum sur le champ car description",
    };
  }
  return { status: true };
};

export default validateCar;
