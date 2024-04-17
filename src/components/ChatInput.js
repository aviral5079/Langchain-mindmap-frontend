import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { getMessageResponse } from "../actions/chatsActions";
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

  return (
    <InputGroup size="md">
      <Input
        as="textarea"
        rows={4}
        placeholder={currentDocument ? "Enter question" : "Select Document"}
        disabled={currentDocument ? false : true}
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        resize="vertical"
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={getResponse}>
          <ArrowUpIcon />
        </Button>
      </InputRightElement>
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
