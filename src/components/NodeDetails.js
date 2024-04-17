import React from "react";
import { connect } from "react-redux";
import {
  Box,
  Heading,
  Text,
  SkeletonText,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";
import Quiz from "./Quiz.js";
import WordCloud from "./WordCloud.js";

const NodeDetails = ({
  nodeTitle,
  content,
  isContentLoading,
  contentError,
  summary,
  isSummaryLoading,
  summaryError,
  isWordCloudLoading,
  wordCloudError,
}) => {
  return (
    <Tabs isFitted variant="enclosed" defaultIndex={1}>
      <TabList>
        <Tab>Content</Tab>
        <Tab>Summary</Tab>
        <Tab>Quiz</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          {isWordCloudLoading && (
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          )}
          {!isWordCloudLoading && (
            <WordCloud isContentLoading={isContentLoading} content={content} />
          )}
        </TabPanel>
        <TabPanel>
          {isSummaryLoading && (
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          )}
          {!isSummaryLoading && (
            <Card>
              <CardHeader paddingBottom="0">
                <Heading size="md" mb={4} textAlign="center">
                  {nodeTitle
                    ? nodeTitle.length > 50
                      ? `${nodeTitle.substr(0, 50)} ...`
                      : nodeTitle
                    : "Node"}
                </Heading>
                <Heading size="md" textAlign="center">
                  Summary
                </Heading>
              </CardHeader>

              <CardBody>
                <Text pt="2" fontSize="sm">
                  {summary || "summary not found"}
                </Text>
              </CardBody>
            </Card>
          )}
        </TabPanel>
        <TabPanel>
          <Quiz />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

const mapStateToProps = ({ nodeDetails, mindmap }) => {
  return {
    nodeTitle: mindmap.nodes[mindmap.selectedNodeId]?.data?.title,
    content: nodeDetails.content,
    isContentLoading: nodeDetails.isContentLoading,
    contentError: nodeDetails.contentError,
    summary: nodeDetails.summary,
    isSummaryLoading: nodeDetails.isSummaryLoading,
    summaryError: nodeDetails.summaryError,
    isWordCloudLoading: nodeDetails.isWordCloudLoading,
    wordCloudError: nodeDetails.wordCloudError,
  };
};

export default connect(mapStateToProps)(NodeDetails);
