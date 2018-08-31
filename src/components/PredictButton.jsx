import React from "react";
import Button from "@material-ui/core/Button";

const PredictButton = props => (
  <Button
    variant="contained"
    color="primary"
    disabled={props.isLoading}
    onClick={props.predict}
  >
    Predict
  </Button>
);

export default PredictButton;
