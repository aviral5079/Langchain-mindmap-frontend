import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";
import { Spacer, Text, CloseButton } from "@chakra-ui/react";
import "../styles/Chatbar.scss";

const Chatbar = ({ currentDocument }) => {
  return (
    <div className="chat-bar">
      <div className="chat-bar__header">
        <Text paddingTop="10px" size="md" as="b" fontSize="16px">
          {currentDocument
            ? `${currentDocument.substr(0, 25)} - Chatbot`
            : "DocMind Chatbot"}
        </Text>
        <Spacer />
        <CloseButton
          size="lg"
          // onClick={() => {
          //   setIsChatVisible(false);
          // }}
        />
      </div>

      <ChatHistory />
      <Spacer />
      <ChatInput />
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentDocument: state.currentDocument.fileName,
});

export default connect(mapStateToProps)(Chatbar);
