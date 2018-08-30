import React from "react";
import Accuracy from "./Accuracy";

const AccuracyTable = () => (
  <table className="table">
    <thead>
      <tr>
        <th>Number</th>
        <th>Accuracy</th>
      </tr>
    </thead>
    <tbody>
      <Accuracy no={0} content="-" />
      <Accuracy no={1} content="-" />
    </tbody>
  </table>
);

export default AccuracyTable;
