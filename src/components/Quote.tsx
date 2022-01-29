import { PureComponent } from "react";
import quoteApi from "../api/quote";

interface IState {
  quote: string;
}

class Quote extends PureComponent<{}, IState> {
  state = { quote: "" };
  componentDidMount() {
    quoteApi()
      .then((res) => this.setState({ quote: res.quoteText }))
      .catch((err) => {
        this.setState({ quote: err.message });
      });
  }

  render() {
    return (
      <h1 style={{ fontSize: "1.5rem", position: "absolute", bottom: "2rem" }}>
        {" "}
        <i className="fas fa-quote-left"></i>
        {this.state.quote}
        <i className="fas fa-quote-right"></i>
      </h1>
    );
  }
}
export default Quote;
