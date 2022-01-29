import React from "react";

interface IProps {
  url: string;
  desc: string;
}

const BackgroundImage: React.FC<IProps> = ({ url, desc }) => {
  //   console.log(`BackgroundImage: ${url}`);
  return (
    <div
      style={{
        backgroundImage: `url(${url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        transition: "background-image 1s ease-in-out",
        WebkitTransition: "background-image 1s ease-in-out",
      }}
    >
      <div className="overlay"></div>
      <div
        style={{
          position: "absolute",
          left: "1rem",
          bottom: "2rem",
          color: "white",
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
          width: "10vw",
        }}
      >
        {desc}
      </div>

      <div
        style={{
          position: "absolute",
          right: "1rem",
          bottom: "2rem",
          color: "white",
          fontSize: "1.2rem",
        }}
      >
        todo
      </div>
    </div>
  );
};

export default BackgroundImage;
