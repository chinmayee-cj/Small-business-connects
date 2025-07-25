import React from "react";
import { hide, show } from "../Assets/index";

const MenuToggle = ({ showMenu, handleMenuToggle }) => {
  return (
    <button
      className="w-10 h-10 flex items-center justify-center rounded-lg bg-lime-100 hover:bg-lime-200 transition shadow"
      onClick={handleMenuToggle}
    >
      {showMenu ? (
        <img src={hide} alt="Hide Menu" className="h-6 w-6" />
      ) : (
        <img src={show} alt="Show Menu" className="h-6 w-6" />
      )}
    </button>

  );
};

export default MenuToggle;
// © 2025 Chinmayee C J. All rights reserved.
