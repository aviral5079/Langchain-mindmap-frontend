import React from "react";
import { connect, useDispatch } from "react-redux";
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";
import { toggleIsChatbarVisible } from "../actions/chatsActions";
import { Spacer, Text, CloseButton } from "@chakra-ui/react";
import "../styles/Chatbar.scss";

const Chatbar = ({ currentDocument }) => {
  const dispatch = useDispatch();
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
          onClick={() => {
            dispatch(toggleIsChatbarVisible());
          }}
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

const mapDispatchToProps = {
  toggleIsChatbarVisible,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chatbar);
