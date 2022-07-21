import React from "react";
import useLocation from "../hooks/useLocation";
import "../styles/header.css";
export default function Header() {
  const { location } = useLocation();

  return (
    <div className="header-content">
      <span>
        Current Location : <b>{location?.country} </b>
      </span>
      <span>
        Currency : <b>{location?.currency} </b>
      </span>
    </div>
  );
}
