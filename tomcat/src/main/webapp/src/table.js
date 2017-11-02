import $ from "jquery";
import "datatables.net";

class Table {
  start() {
    $(".table").DataTable();
  }
}

export default Table;
