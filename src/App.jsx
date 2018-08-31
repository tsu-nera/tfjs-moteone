import React from "react";

import "./App.css";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import PredictButton from "./components/PredictButton";
import CaptureButton from "./components/CaptureButton";
import AccuracyTable from "./components/AccuracyTable";
import Message from "./components/Message";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      is_loading: true,
      model: null,
      screenshot: null,
      scores: ["-", "-"]
    };
    this.onRef = this.onRef.bind(this);
    this.getImageData = this.getImageData.bind(this);
    this.getAccuracyScores = this.getAccuracyScores.bind(this);
    this.predict = this.predict.bind(this);
    this.setRef = this.setRef.bind(this);
    this.capture = this.capture.bind(this);
  }

  componentDidMount() {
    tf.loadModel(
      "https://raw.githubusercontent.com/tsu-nera/tfjs-moteone/master/model/model.json"
    ).then(model => {
      this.setState({
        is_loading: false,
        model
      });
    });
  }

  onRef(ref) {
    this.signaturePad = ref;
  }

  getAccuracyScores(imageData) {
    const scores = tf.tidy(() => {
      // convert to tensor (shape: [width, height, channels])
      const channels = 3;
      let input = tf.fromPixels(imageData, channels);

      // normalized
      input = tf.cast(input, "float32").div(tf.scalar(255));

      // reshape input format (shape: [batch_size, width, height, channels])
      input = input.expandDims();
      // predict
      return this.state.model.predict(input).dataSync();
    });
    return scores;
  }

  getImageData() {
    return new Promise(resolve => {
      const context = document.createElement("canvas").getContext("2d");

      const image = new Image();
      const width = 160;
      const height = 160;

      image.onload = () => {
        context.drawImage(image, 0, 0, width, height);
        const imageData = context.getImageData(0, 0, width, height);
        resolve(imageData);
      };

      image.src = this.state.screenshot;
    });
  }

  setRef(webcam) {
    this.webcam = webcam;
  }

  capture() {
    const screenshot = this.webcam.getScreenshot();
    this.setState({ screenshot });
  }

  predict() {
    this.getImageData().then(imageData => {
      const scores = this.getAccuracyScores(imageData);
      this.setState({ scores });
    });
  }

  render() {
    return (
      <Grid>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="title" color="inherit">
              IkeMen
            </Typography>
          </Toolbar>
        </AppBar>
        <div
          style={{
            maxWidth: 900,
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          <h1 className="title" style={{ textAlign: "center" }}>
            イケメン判定 with TensorFlow.js
          </h1>
          <Grid container spacing={3}>
            <Grid item xs>
              <h3>1.Webcam</h3>
              <Webcam
                audio={false}
                height={185}
                ref={this.setRef}
                screenshotFormat="image/jpeg"
                width={250}
              />
            </Grid>
            <Grid item xs>
              <h3>2.Screenshot</h3>
              <div className="screenshots">
                <div className="controls" />
                {this.state.screenshot ? (
                  <img src={this.state.screenshot} alt="screenshot" />
                ) : null}
              </div>
            </Grid>
            <Grid item xs>
              <AccuracyTable scores={this.state.scores} />
            </Grid>
          </Grid>
        </div>
        <Grid container spacing={3}>
          <Grid item xs>
            {" "}
          </Grid>
          <Grid item xs>
            <div style={{ textAlign: "center" }}>
              <CaptureButton capture={this.capture} />
            </div>
          </Grid>
          <Grid item xs>
            <PredictButton
              isLoading={this.state.is_loading}
              predict={this.predict}
            />
          </Grid>
        </Grid>
        <Message
          isLoading={this.state.is_loading}
          score={this.state.scores[0]}
        />
      </Grid>
    );
  }
}

export default App;
