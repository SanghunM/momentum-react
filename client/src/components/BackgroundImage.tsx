import React from "react";

interface IProps {
  url: string;
}

const BackgroundImage: React.FC<IProps> = ({ url }) => {
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
    </div>
  );
};

export default BackgroundImage;
