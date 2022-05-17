import React from "react";

const Footer = () => {
  // ajker date er year ti jate pete pari:
  const year = new Date().getFullYear();
  return (
    <footer className="mt-5 text-center">
      <p>
        <small>Copyright &copy; Tanvir Rifat | {year}</small>
      </p>
    </footer>
  );
};

export default Footer;
