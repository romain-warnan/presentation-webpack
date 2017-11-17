import React, { Component } from "react";
import image from "./preloader.svg";
import "./preloader.css";

interface PreloaderProps {
  active: boolean;
}

class Preloader extends Component<PreloaderProps> {
  render() {
    const { active } = this.props;
    if (active) {
      return (
        <div className="wait">
          <img src={image} alt="Veuillez-patienter..." />
        </div>
      );
    } else return null;
  }
}

export default Preloader;
