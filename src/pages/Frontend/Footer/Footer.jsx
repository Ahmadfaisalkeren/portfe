import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mt-auto border border-2 dark:border-white border-black rounded-xl">
      <h1 className="p-3 text-base font-semibold dark:text-white text-black text-center">
        Made with 🤍 by Ahmad Faisal &copy; {currentYear}
      </h1>
    </div>
  );
};

export default Footer;
