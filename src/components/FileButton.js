import React from "react";
import DocumentList from "./DocumentList";
import FileInput from "./FileInput";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import "../styles/FileButton.scss";

const FileButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <div className="file-upload">
      <div className="tab-button">
        <Button
          rightIcon={<HamburgerIcon />}
          ref={btnRef}
          onClick={onOpen}
          className="doc-btn"
        >
          Doc
        </Button>
      </div>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <h2>DocMind GenAI</h2>
          </DrawerHeader>

          <DrawerBody display="flex" flexDirection="column">
            <DocumentList />
            <FileInput />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default FileButton;
