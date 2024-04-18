import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import {
  getMessageResponse,
  fetchChatResponseSuccess,
} from "../actions/chatsActions";
import { manualMindmap } from "../actions/mindmapActions";
import {
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Textarea,
} from "@chakra-ui/react";

import { ArrowUpIcon } from "@chakra-ui/icons";

const ChatInput = ({ currentDocument, getMessageResponse }) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const getResponse = async (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      if (message.startsWith(":")) {
        const lines = message.split("\n");
        if (lines.length > 1) {
          const secondLine = lines[1].trim();
          const page_numbers = secondLine.split(" ").map(Number);
          console.log(currentDocument, page_numbers);
          setMessage("");
          const chatbotMessage = {
            role: "chatbot",
            message: "Creating Manual Mindmap ...",
          };
          const chat = [chatbotMessage];
          dispatch(fetchChatResponseSuccess(chat));
          await dispatch(manualMindmap(currentDocument, page_numbers));
        }
      } else {
        try {
          setMessage("");
          await dispatch(getMessageResponse(message));
        } catch (err) {
          console.error("Error getting response:", err);
        }
      }
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    const lines = e.target.value.split("\n").length;
    e.target.rows = Math.min(4, Math.max(1, lines));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      getResponse(e);
    }
  };

  return (
    <InputGroup size="md">
      <Textarea
        placeholder={currentDocument ? "Enter question" : "Select Document"}
        disabled={currentDocument ? false : true}
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        rows={1}
        resize="none"
        style={{
          overflowY: "auto",
          maxHeight: "10rem",
        }}
      />
    </InputGroup>
  );
};

const mapStateToProps = (state) => ({
  currentDocument: state.currentDocument.fileName,
});

const mapDispatchToProps = {
  getMessageResponse,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatInput);
