import React from "react";

function NavButton({ setPages, index }) {
  return (
    <button
      onClick={() => setPages({ page: index })}
      type="button"
      className="rounded-full border w-16 hover:bg-zinc-200"
    >
      {index}
    </button>
  );
}

export default NavButton;
