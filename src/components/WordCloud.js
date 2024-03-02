import React from "react";
import { connect } from "react-redux";
import { Heading } from "@chakra-ui/react";
import ReactWordcloud from "react-wordcloud";

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

const size = [12, 20];

const options = {
  padding: 20,
  rotate: true,
  fontSizes: [20, 60],
  spiral: "rectangular",
  rotations: 1,
  rotationAngles: [0],
  deterministic: true,
  scale: "linear",
};

const WordCloud = ({ words, nodeTitle }) => {
  return (
    <>
      <Heading size="md" textAlign="center">
        {nodeTitle}
      </Heading>
      <Heading size="md" mb={4} textAlign="center">
        Word Cloud
      </Heading>
      <ReactWordcloud
        className="word-cloud"
        options={options}
        size={size}
        words={words?.slice(0, 40)}
      />
    </>
  );
};

const mapStateToProps = ({ nodeDetails, mindmap }) => ({
  words: nodeDetails.wordCloud,
  nodeTitle: mindmap.nodes[mindmap.selectedNodeId]?.data?.title,
});

export default connect(mapStateToProps)(WordCloud);
