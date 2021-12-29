import React, { Component } from "react";

interface IState {
  time: string;
}

class Watch extends Component<{}, IState> {
  private intervalRef: NodeJS.Timer | null = null;
  state = {
    time: "",
  };
  //when using timer
  componentDidMount() {
    this.intervalRef = setInterval(() => {
      const currentTime = new Date();
      let hour: string = String(currentTime.getHours());
      if (Number(hour) < 10) {
        hour = `0${hour}`;
      }

      let min: string = String(currentTime.getMinutes());
      if (Number(min) < 10) {
        min = `0${min}`;
      }

      let sec: string = String(currentTime.getSeconds());
      if (Number(sec) < 10) {
        sec = `0${sec}`;
      }

      this.setState({
        time: `${hour}:${min}:${sec}`,
      });
    }, 1000);
  }

  //when performing setInterval, it is not null, so we need to clear it when unmount it
  componentWillUnmount() {
    if (this.intervalRef) {
      clearInterval(this.intervalRef);
    }
  }

  render() {
    return (
      <h1
        style={{
          marginTop: 0,
          marginBottom: 0,

          fontSize: "5rem",
        }}
      >
        {this.state.time}
      </h1>
    );
  }
}

export default Watch;
