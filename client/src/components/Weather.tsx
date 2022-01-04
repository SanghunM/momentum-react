import { PureComponent } from "react";

import weatherApi, { getImage } from "../api/weather";

interface IState {
  name: string;
  temp: string;
  iconSrc: string;
}

class Weather extends PureComponent<{}, IState> {
  state = { name: "", temp: "-100", iconSrc: "" };
  componentDidMount() {
    weatherApi().then((res) => {
      console.log(res.list[0].name);
      console.log(res.list[0].weather[0].icon);
      console.log(res.list[0].main.temp - 273.15);
      this.setState({
        temp: `${(res.list[0].main.temp - 273.15).toFixed(2)} °C`,
        iconSrc: getImage(res.list[0].weather[0].icon),
        name: res.list[0].name,
      });

      // this.setState({ weatherInfo: res.quoteText })
    });
  }

  render() {
    return (
      <h1
        style={{
          fontSize: "1.5rem",
          position: "absolute",
          top: "1rem",
          right: "2rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={this.state.iconSrc} alt="weather" />
          <span>{this.state.temp}</span>
        </div>
        <span>{this.state.name}</span>
      </h1>
    );
  }
}
export default Weather;
