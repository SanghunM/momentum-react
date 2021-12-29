export type ImageURL = {
  full: string;
  raw: string;
  regular: string;
  small: string;
  thumb: string;
};

class MyImage {
  private id_: string;
  private urls_: ImageURL;
  private width_: string;
  private height_: string;

  constructor(id: string, urls: ImageURL, width: string, height: string) {
    this.id_ = id;
    this.urls_ = urls;
    this.width_ = width;
    this.height_ = height;
  }

  get id() {
    return this.id_;
  }

  get urls() {
    return this.urls_;
  }

  get width() {
    return this.width_;
  }

  get height() {
    return this.height_;
  }
}

export default MyImage;
