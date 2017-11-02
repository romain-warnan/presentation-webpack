import $ from "jquery";
import Accueil from "./accueil";
import Nomenclature from "./nomenclature";
import Table from "./table";

$(document).ready(() => {
  switch (window.location.pathname) {
    case "/demo-js/accueil":
      const accueil = new Accueil();
      accueil.start();
      break;

    case "/demo-js/nomenclature":
      const nomenclature = new Nomenclature();
      nomenclature.start();
      break;

    case "/demo-js/datatable":
      const table = new Table();
      table.start();
      break;
  }
});
