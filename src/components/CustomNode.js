import React, { useState } from "react";
import { connect } from "react-redux";
import {
  setCurrentRootNodeId,
  setSelectedNode,
  setNodeDetails,
} from "../actions/mindmapActions";
import { Handle, Position } from "reactflow";
import {
  CircularProgress,
  CircularProgressLabel,
  Icon,
  Heading,
} from "@chakra-ui/react";
import { BiExpandAlt, BiCollapseAlt } from "react-icons/bi";

const handleStyle = {
  borderRadius: "4px",
  border: `1px solid #23272a`,
  backgroundColor: "#3F72AF",
};

const CustomNode = ({
  currentRootNodeId,
  data,
  isConnectable,
  setCurrentRootNodeId,
  setSelectedNode,
  setNodeDetails,
}) => {
  const [expand, setExpand] = useState(false);
  const [progress, setProgress] = useState(0);

  let handlePosition = "horizontal";

  const calcHandlePosition = (angle) => {
    if (angle <= 45 || angle >= 315) {
      return Position.Left;
    } else if (angle > 45 && angle <= 135) {
      handlePosition = "vertical";
      return Position.Top;
    } else if (angle > 135 && angle <= 225) {
      return Position.Right;
    } else if (angle > 225 && angle < 315) {
      handlePosition = "vertical";
      return Position.Bottom;
    }
  };

  calcHandlePosition(data.firstChildPostionAngle);

  return (
    <div className="treeNode">
      <div className="treeNode-header">
        <CircularProgress value={progress} color="green.400" size="30px">
          <CircularProgressLabel color="#23272a">
            {progress}%
          </CircularProgressLabel>
        </CircularProgress>
        <div
          className="treeNode-header__title"
          onClick={() => {
            setSelectedNode(data.key);
            setNodeDetails(data.key);
          }}
        >
          <Heading as="h4" size="lg" color="#23272a" textAlign="center">
            {data.label
              ? data.label.length > 50
                ? `${data.label.substr(0, 50)}...`
                : data.label
              : "Node"}
          </Heading>
        </div>
        {expand ? (
          <Icon
            as={BiExpandAlt}
            boxSize={4}
            color="#23272a"
            cursor="pointer"
            onClick={() => {
              const newValue = !expand;
              setExpand(newValue);
              if (data.parentId !== null) setCurrentRootNodeId(data.parentId);
            }}
          />
        ) : (
          <Icon
            as={BiCollapseAlt}
            boxSize={4}
            color="#23272a"
            cursor="pointer"
            onClick={() => {
              const newValue = !expand;
              setExpand(newValue);
              setCurrentRootNodeId(data.key);
            }}
          />
        )}
      </div>

      <Handle
        type={data.key === currentRootNodeId ? "source" : "target"}
        position={calcHandlePosition(data.positionAngle)}
        id="a"
        isConnectable={isConnectable}
        style={{
          ...handleStyle,
          [handlePosition === "vertical" ? "width" : "height"]: "15px",
        }}
      />
      <Handle
        type="source"
        position={calcHandlePosition((data.positionAngle + 180) % 360)}
        id="b"
        isConnectable={isConnectable}
        style={{
          ...handleStyle,
          [handlePosition === "vertical" ? "width" : "height"]: "15px",
        }}
      />
    </div>
  );
};

const mapStateToProps = ({ mindmap }) => ({
  currentRootNodeId: mindmap.currentRootNodeId,
});

const mapDispatchToProps = {
  setCurrentRootNodeId,
  setSelectedNode,
  setNodeDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomNode);
