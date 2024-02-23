import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import { Stack, Avatar, Icon } from "@chakra-ui/react";
import { GoDependabot } from "react-icons/go";

const ChatHistory = ({ chats }) => {
  const scrollContainerRef = useRef();

  useEffect(() => {
    scrollContainerRef.current.scrollTop =
      scrollContainerRef.current.scrollHeight;
  }, [chats]);

  return (
    <ul className="history" ref={scrollContainerRef}>
      {chats?.map((message, index) => (
        <li key={index} className={`${message.role}-message`}>
          {message.role === "user" ? (
            <Stack direction="row" spacing={2}>
              <Avatar
                size="sm"
                bg="#485550"
                icon={<Icon as={GoDependabot} color="#c0eb6a" />}
              />
              <span className="message">{message.message}</span>
            </Stack>
          ) : (
            <Stack direction="row" spacing={2}>
              <Avatar
                size="sm"
                bg="#F9F7F7"
                icon={<Icon as={GoDependabot} color="#112D4E" />}
              />
              <span className="message">{message.message}</span>
            </Stack>
          )}
        </li>
      ))}
    </ul>
  );
};

const mapStateToProps = ({ chats }) => ({
  chats: chats.chats,
});

export default connect(mapStateToProps)(ChatHistory);
