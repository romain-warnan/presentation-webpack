import React from "react";
import PropTypes from "prop-types";
import image from "./preloader.svg";
import "./preloader.css";

const Preloader = ({ active }) => {
  if (active) {
    return (
      <div className="wait">
        <img src={image} alt="Veuillez-patienter..." />
      </div>
    );
  } else return null;
};

Preloader.propTypes = {
  active: PropTypes.bool.isRequired
};

export default Preloader;
