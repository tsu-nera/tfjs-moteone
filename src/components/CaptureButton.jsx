import React from "react";
import Button from "@material-ui/core/Button";

const CaptureButton = props => (
  <Button variant="contained" onClick={props.capture}>
    Capture
  </Button>
);

export default CaptureButton;
