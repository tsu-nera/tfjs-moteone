import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const AccuracyTable = () => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>You</TableCell>
        <TableCell>Accuracy</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow key={1}>
        <TableCell scope="row">イケメン</TableCell>
        <TableCell>-</TableCell>
      </TableRow>
      <TableRow key={2}>
        <TableCell scope="row">キモい</TableCell>
        <TableCell>-</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

export default AccuracyTable;
