import { PureComponent } from "react";
import Loader from "./Loader";
import weatherApi, { getImage } from "../api/weather";

interface IState {
  name: string;
  temp: string;
  iconSrc: string;
  isLoading: boolean;
}

class Weather extends PureComponent<{}, IState> {
  state = { name: "", temp: "-100", iconSrc: "", isLoading: false };
  componentDidMount() {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        weatherApi()
          .then((res) => {
            this.setState({
              isLoading: false,
              temp: `${(res.list[0].main.temp - 273.15).toFixed(2)} °C`,
              iconSrc: getImage(res.list[0].weather[0].icon),
              name: res.list[0].name,
            });

            // this.setState({ weatherInfo: res.quoteText })
          })
          .catch((err) => {
            this.setState({
              temp: "API error",
              iconSrc: "",
              name: "failed,",
              isLoading: false,
            });
          });
      }
    );
  }

  render() {
    return (
      <h1
        style={{
          fontSize: "1.5rem",
          position: "absolute",
          color: "white",
          top: "1rem",
          right: "2rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {this.state.isLoading ? (
            <Loader />
          ) : (
            <>
              <img src={this.state.iconSrc} alt="weather" />
              <span>{this.state.temp}</span>
            </>
          )}
        </div>
        <span>{this.state.name}</span>
      </h1>
    );
  }
}
export default Weather;
