import React from "react";
import Typography from "@material-ui/core/Typography";

class Message extends React.Component {
  render() {
    const style = { textAlign: "center", marginTop: 60 };

    if (this.props.isLoading) {
      return (
        <Typography variant="display2" style={style}>
          Loading Model...
        </Typography>
      );
    }

    if (this.props.score !== "-") {
      if (this.props.score > 0.5) {
        return (
          <Typography variant="display4" style={style}>
            You are イケメン！!
          </Typography>
        );
      }

      return (
        <Typography variant="display1" style={style}>
          You are not イケメン
        </Typography>
      );
    }

    return <div />;
  }
}

export default Message;
