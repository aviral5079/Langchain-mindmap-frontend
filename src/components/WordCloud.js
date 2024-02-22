import React from "react";
import ReactWordcloud from "react-wordcloud";

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

import words from "../constants/words.js";

const size = [12, 20];

const options = {
  padding: 7,
  rotate: true,
  fontSizes: [20, 60],
  spiral: "rectangular",
  rotations: 1,
  rotationAngles: [0],
  deterministic: true,
};

const WordCloud = () => {
  return (
    <ReactWordcloud
      className="word-cloud"
      options={options}
      size={size}
      words={words}
    />
  );
};

export default WordCloud;
