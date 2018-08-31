import React from "react";
import Button from "@material-ui/core/Button";

const PredictButton = props => (
  <Button
    variant="contained"
    color="primary"
    className={`${props.isLoading}`}
    onClick={props.predict}
  >
    Prediction
  </Button>
);

export default PredictButton;
