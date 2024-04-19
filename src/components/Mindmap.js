import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Button, Select } from "@chakra-ui/react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Controls,
  ReactFlowProvider,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";
import NodeDetails from "./NodeDetails";
import { setCurrentRootNodeId } from "../actions/mindmapActions";
import {
  getVisibleNodes,
  getVisibleEdges,
} from "../selectors/mindmapDataSelector";
import { toggleIsNodeDetailsVisible } from "../actions/nodeDetailsActions";
import { BiSolidShow } from "react-icons/bi";
import { GrFormViewHide } from "react-icons/gr";

const snapGrid = [20, 20];
const nodeTypes = {
  customNode: CustomNode,
};

const CustomNodeFlow = ({ GraphNodes, GraphEdges, selectedNodeId }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(GraphNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(GraphEdges);

  useEffect(() => {
    setNodes(GraphNodes);
    setEdges(GraphEdges);
  }, [GraphNodes, GraphEdges]);

  useEffect(() => {
    const updatedNodes = GraphNodes.map((node) => ({
      ...node,
      selected: node.id === selectedNodeId,
    }));
    setNodes(updatedNodes);
  }, [GraphNodes, selectedNodeId]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      style={{ background: "#F9F7F7" }}
      nodeTypes={nodeTypes}
      snapToGrid={true}
      fitView
      defaultViewport={{ x: 400, y: 390, zoom: 0.3 }}
      snapGrid={snapGrid}
      attributionPosition="bottom-left"
      maxZoom={4}
      minZoom={0.1}
    >
      <MiniMap />
      <Controls />
    </ReactFlow>
  );
};

const Mindmap = ({
  currentDocument,
  GraphNodes,
  GraphEdges,
  selectedNodeId,
  isNodeDetailsVisible,
  rootNodeIds,
  currentRootNodeId,
  setCurrentRootNodeId,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const dispatch = useDispatch();

  const handleMouseDown = (e) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const newPosition = (e.clientX / window.innerWidth) * 100;

    const minFirstComponentWidth = 40;
    const maxFirstComponentWidth = 75;
    const minSecondComponentWidth = 25;
    const maxSecondComponentWidth = 60;

    const minPosition = Math.min(
      100 - maxSecondComponentWidth,
      maxFirstComponentWidth
    );
    const maxPosition = Math.max(
      minFirstComponentWidth,
      100 - minSecondComponentWidth
    );

    const adjustedPosition = Math.max(
      minPosition,
      Math.min(newPosition, maxPosition)
    );

    if (adjustedPosition >= minPosition && adjustedPosition <= maxPosition) {
      setSliderPosition(adjustedPosition);
      const slider = document.querySelector(".slider");
      slider.style.left = `${adjustedPosition - 0.5}%`;
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  if (currentDocument) {
    return (
      <div className="container">
        <div
          className="mindmap-container"
          style={{ width: `${sliderPosition}%` }}
        >
          <ReactFlowProvider>
            <CustomNodeFlow
              GraphNodes={GraphNodes}
              GraphEdges={GraphEdges}
              selectedNodeId={selectedNodeId}
            />
          </ReactFlowProvider>
          <div className="node-details-button-container">
            <Button
              leftIcon={
                isNodeDetailsVisible ? <GrFormViewHide /> : <BiSolidShow />
              }
              color="#3F72AF"
              onClick={() => {
                dispatch(toggleIsNodeDetailsVisible());
              }}
            >
              {isNodeDetailsVisible ? "Hide" : "Show"}
            </Button>
          </div>
          <div className="root-node-selector-container">
            <Select
              value={currentRootNodeId}
              onChange={(e) => {
                const id = e.target.value;
                dispatch(setCurrentRootNodeId(id));
              }}
            >
              {rootNodeIds.map((rootId, index) => (
                <option key={index} value={rootId}>
                  {rootId}
                </option>
              ))}
            </Select>
          </div>
        </div>
        {isNodeDetailsVisible && (
          <div
            className="sliderContainer"
            style={{ left: `${sliderPosition}%` }}
            onMouseDown={handleMouseDown}
          >
            <div className="slider" style={{ left: "-5px" }}>
              <div className="sliderHandle"></div>
            </div>
          </div>
        )}
        {isNodeDetailsVisible && (
          <div
            className="node-details-container"
            style={{ width: `calc(100% - ${sliderPosition}%)` }}
          >
            <NodeDetails />
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="not-available">
        <h1>UPLOAD/SELECT A DOCUMENT TO GET STARTED</h1>
      </div>
    );
  }
};

const mapStateToProps = ({ currentDocument, mindmap, nodeDetails }) => ({
  currentDocument: currentDocument.fileName,
  GraphNodes: getVisibleNodes(
    mindmap.nodes,
    mindmap.edges,
    mindmap.currentRootNodeId
  ),
  GraphEdges: getVisibleEdges(
    mindmap.nodes,
    mindmap.edges,
    mindmap.currentRootNodeId
  ),
  currentRootNodeId: mindmap.currentRootNodeId,
  rootNodeIds: mindmap.rootNodeIds,
  selectedNodeId: mindmap.selectedNodeId,
  isNodeDetailsVisible: nodeDetails.isNodeDetailsVisible,
});

const mapDispatchToProps = {
  toggleIsNodeDetailsVisible,
  setCurrentRootNodeId,
};

export default connect(mapStateToProps, mapDispatchToProps)(Mindmap);
