import React from "react";
import "./App.css";
import * as tf from "@tensorflow/tfjs";
import "bulma/css/bulma.css";
import Webcam from "react-webcam";
import PredictButton from "./components/PredictButton";
import CaptureButton from "./components/CaptureButton";
import AccuracyTable from "./components/AccuracyTable";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      is_loading: "is-loading",
      model: null,
      screenshot: null
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
        is_loading: "",
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
      console.log(scores);
    });
  }

  render() {
    return (
      <div className="container">
        <h1 className="title" style={{ textAlign: "center" }}>
          イケメン判定(あなたはサルか人間か？)
        </h1>
        <div className="columns is-centered">
          <div className="column is-4">
            <h2>Webcam</h2>
            <Webcam
              audio={false}
              height={350}
              ref={this.setRef}
              screenshotFormat="image/jpeg"
              width={350}
            />
            <div>
              <h2>Screenshot</h2>
              <div className="screenshots">
                <div className="controls" />
                {this.state.screenshot ? (
                  <img src={this.state.screenshot} alt="screenshot" />
                ) : null}
              </div>
            </div>
            <div className="field is-grouped">
              <CaptureButton className="control" capture={this.capture} />
              <PredictButton
                className="control"
                isLoading={this.state.is_loading}
                predict={this.predict}
              />
            </div>
          </div>
          <div className="column is-3">
            <AccuracyTable />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
