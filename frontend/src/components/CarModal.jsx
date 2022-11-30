function CarModal({ handleDisplay }) {
  return (
    <div className=" w-full h-full z-[1] absolute top-0 flex justify-center items-center  ">
      <div className="w-4/5 h-4/5 bg-slate-400 p-4 rounded-[5rem] flex flex-col justify-center items-center">
        <h1 className="text-red-700 text-3xl mb-8">
          Are you sure you want to delete this car ?
        </h1>
        <div className="flex justify-around w-full">
          <button className="bg-red-700 py-2 px-4 rounded-3xl">yes</button>
          <button
            className="bg-green-500 py-2 px-4 rounded-3xl"
            onClick={() => handleDisplay()}
          >
            no
          </button>
        </div>
      </div>
    </div>
  );
}
export default CarModal;
