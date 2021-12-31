import React, { Component } from "react";
import unsplahshApi from "../api/unsplash";
import BackgroundImage from "../components/BackgroundImage";
import Loader from "../components/Loader";
import MyImage from "../model/MyImage";
import Watch from "../components/Watch";
import Greeting from "../components/Greeting";
import { toUnicode } from "punycode";
import TodoList from "../components/TodoList";
import Todo from "../components/Todo";

interface IState {
  isLoading: boolean;
  images: MyImage[];
  backgroundUrl: string;
  isImageReady: boolean;
}

class MomentumPage extends Component<{}, IState> {
  private intervalRef: NodeJS.Timer | null = null;
  private count: number = 0;

  state = {
    isLoading: true,
    images: [],
    backgroundUrl: "",
    isImageReady: false,
  };

  // api
  componentDidMount() {
    console.log("componentDidMount");
    this.setState(
      {
        isLoading: true,
      },
      () => {
        setTimeout(() => {
          console.log(this.state.isLoading);
          unsplahshApi("dog").then((res) => {
            this.setState(
              {
                isLoading: false,
              },
              () => {
                console.log(this.state.isLoading);
                console.log(res.results);
                const newImages: MyImage[] =
                  res.results &&
                  res.results.map(
                    (e: any) => new MyImage(e.id, e.urls, e.width, e.height)
                  );
                console.log(newImages);
                this.setState(
                  {
                    images: newImages,
                  },
                  () => {
                    this.getPrepareForPreLoading();
                  }
                );
              }
            );
          });
        }, 2000);
      }
    );
    this.setIntervalForBackground();
  }

  componentDidUpdate() {
    if (this.count === this.state.images.length) {
      this.count = 0;
      if (this.intervalRef) {
        clearInterval(this.intervalRef);
        this.setIntervalForBackground();
      }
    }
  }

  componentWillUnmount() {
    if (this.intervalRef) {
      clearInterval(this.intervalRef);
    }
  }

  setIntervalForBackground() {
    this.intervalRef = setInterval(() => {
      if (this.state.images.length > 0) {
        const urls = (
          this.state.images[this.count++ % this.state.images.length] as MyImage
        ).urls;
        this.setState({
          backgroundUrl: urls.full,
        });
      }
    }, 10000);
  }

  getPrepareForPreLoading() {
    if (this.state.images.length > 0) {
      const head = document.querySelector("head");
      if (head) {
        console.log(head);
        this.state.images.forEach((image: MyImage) => {
          const link = document.createElement("link");
          link.rel = "preload";
          link.href = image.urls.full;
          link.as = "image";
          head.append(link);
        });
      }
      //   this.state.images.forEach((image: MyImage) => {
      //     const img = new Image();

      //     // cache enable is necessary
      //     img.src = image.urls.full;
      //     img.onload = () => {
      //       console.log("ready");
      //     };
      //   });
    }
  }

  render() {
    return this.state.isLoading ? (
      <div className="loader-container">
        <Loader />
      </div>
    ) : (
      <>
        <BackgroundImage url={this.state.backgroundUrl} />
        <div className="main-content">
          <Watch></Watch>
          <Greeting></Greeting>
          <TodoList />
        </div>
      </>
    );
  }
}

export default MomentumPage;
