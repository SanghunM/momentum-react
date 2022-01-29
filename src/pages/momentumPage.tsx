import React, { Component } from "react";
import unsplahshApi from "../api/unsplash";
import BackgroundImage from "../components/BackgroundImage";
import Loader from "../components/Loader";
import MyImage from "../model/MyImage";
import Watch from "../components/Watch";
import Greeting from "../components/Greeting";
import TodoList from "../components/TodoList";
import Quote from "../components/Quote";
import Weather from "../components/Weather";
import TodoPresenter from "../presenters/TodoPresenter";
import Todo from "../model/Todo";
import { resolveSoa } from "dns";

interface IState {
  isLoading: boolean;
  images: MyImage[];
  backgroundUrl: string;
  isImageReady: boolean;
  desc: string;
  todos: Todo[];
}

class MomentumPage extends Component<{}, IState> {
  private intervalRef: NodeJS.Timer | null = null;
  private count: number = 0;

  state = {
    todos: [],
    isLoading: true,
    images: [],
    backgroundUrl: "",
    desc: "",
    isImageReady: false,
  };

  // api
  componentDidMount() {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        fetch("http://localhost:8000/todo")
          .then((res) => res.json())
          .then((res) => {
            console.log("resis", res);
            this.setState(
              {
                todos: res.todos.map(
                  (todo: any) =>
                    new Todo(
                      todo._id,
                      todo.message,
                      todo.done,
                      new Date(todo.created),
                      new Date(todo.updated)
                    )
                ),
              },
              () => {
                console.log("todos is", this.state.todos);
                unsplahshApi("dog").then((res) => {
                  this.setState(
                    {
                      isLoading: false,
                    },
                    () => {
                      const newImages: MyImage[] =
                        res.results &&
                        res.results.map(
                          (e: any) =>
                            new MyImage(
                              e.id,
                              e.urls,
                              e.width,
                              e.height,
                              e.alt_description
                            )
                        );
                      this.setState(
                        {
                          images: newImages,
                        },
                        () => {
                          this.getPrepareForPreLoading();
                          this.loadingBackgroundImage();
                          this.setIntervalForBackground();
                        }
                      );
                    }
                  );
                });
              }
            );
          })
          .catch((err) => {
            this.setState({
              isLoading: false,
            });
          });
      }
    );
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

  loadingBackgroundImage() {
    if (this.state.images.length > 0) {
      const myImage = this.state.images[
        this.count++ % this.state.images.length
      ] as MyImage;
      this.setState({
        backgroundUrl: myImage.urls.full,
        desc: myImage.desc,
      });
    }
  }

  componentWillUnmount() {
    if (this.intervalRef) {
      clearInterval(this.intervalRef);
    }
  }

  setIntervalForBackground() {
    this.intervalRef = setInterval(() => {
      this.loadingBackgroundImage();
    }, 10000);
  }

  getPrepareForPreLoading() {
    if (this.state.images.length > 0) {
      const head = document.querySelector("head");
      if (head) {
        this.state.images.forEach((image: MyImage) => {
          const link = document.createElement("link");
          link.rel = "preload";
          link.href = image.urls.full;
          link.as = "image";
          head.append(link);
        });
      }
    }
  }

  render() {
    // console.log("todos are", this.state.todos);
    return this.state.isLoading ? (
      <div className="loader-container">
        <Loader />
      </div>
    ) : (
      <>
        <BackgroundImage
          url={this.state.backgroundUrl}
          desc={this.state.desc}
        />
        <div className="main-content">
          <Watch></Watch>
          <Greeting></Greeting>
          <TodoList presenter={new TodoPresenter(this.state.todos)} />
          <Quote />
        </div>
        <Weather />
      </>
    );
  }
}

export default MomentumPage;
