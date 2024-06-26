import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Heading,
  Box,
  Stack,
  Text,
  SkeletonText,
  Highlight,
} from "@chakra-ui/react";
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

const WordCloud = ({ words, nodeTitle, isContentLoading, content }) => {
  const [queryWord, setQueryWord] = useState("");
  const [isRendering, setIsRendering] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsRendering(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  const handleWordClick = (word, event) => {
    setQueryWord(word.text);
  };

  words.sort((a, b) => b.value - a.value);

  return (
    <>
      {isRendering ? (
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
      ) : (
        <ReactWordcloud
          className="word-cloud"
          options={options}
          size={size}
          words={words?.slice(0, 20)}
          callbacks={{
            onWordClick: handleWordClick,
          }}
        />
      )}
      <Heading size="md" textAlign="center">
        {nodeTitle
          ? nodeTitle.length > 50
            ? `${nodeTitle.substr(0, 50)} ...`
            : nodeTitle
          : "Node"}
      </Heading>
      <Heading size="md" mb={4} textAlign="center">
        Word Cloud
      </Heading>
      <Box className="scrollable-container" maxH="48vh" overflowY="auto">
        <Stack spacing={4} direction="column">
          {content?.map((data, index) => {
            if (data && data.text) {
              return (
                <Text fontSize="sm" key={index}>
                  <Highlight
                    query={queryWord}
                    styles={{
                      px: "2",
                      py: "1",
                      bg: "#c0eb6a",
                    }}
                  >
                    {data.text}
                  </Highlight>
                </Text>
              );
            } else if (data) {
              return (
                <Text fontSize="md" as="b" key={index}>
                  <Highlight
                    query={queryWord}
                    styles={{
                      px: "2",
                      py: "1",
                      bg: "#c0eb6a",
                    }}
                  >
                    {data.title}
                  </Highlight>
                </Text>
              );
            }
          })}
        </Stack>
      </Box>
    </>
  );
};

const mapStateToProps = ({ nodeDetails, mindmap }) => ({
  words: nodeDetails.wordCloud,
  nodeTitle: mindmap.nodes[mindmap.selectedNodeId]?.data?.title,
});

export default connect(mapStateToProps)(WordCloud);
