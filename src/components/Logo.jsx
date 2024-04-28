import React from "react";
import { Link } from "react-router-dom";
export default function Logo({
  logo
}) {
  return <div>
          <Link to={'/'}> <img src={logo} alt="X logo" className="w-16 lg:w-72 m-9" /> </Link>
        </div>;
}
  