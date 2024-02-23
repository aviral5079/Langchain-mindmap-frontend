import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { getMessageResponse } from "../actions/chatsActions";
import { InputRightElement, InputGroup, Input, Button } from "@chakra-ui/react";

import { ArrowUpIcon } from "@chakra-ui/icons";

const ChatInput = ({ currentDocument, getMessageResponse }) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const getResponse = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      try {
        setMessage("");
        dispatch(getMessageResponse(message));
      } catch (err) {
        console.error("Error getting response:", err);
      }
    }
  };

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type="text"
        placeholder={currentDocument ? "Enter question" : "Select Document"}
        disabled={currentDocument ? false : true}
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
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
