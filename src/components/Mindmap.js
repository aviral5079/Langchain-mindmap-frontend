import React, { useEffect } from "react";
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
  const [nodes, setNodes] = useNodesState(GraphNodes);
  const [edges, setEdges] = useEdgesState(GraphEdges);

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
      style={{ background: "#F9F7F7" }}
      nodeTypes={nodeTypes}
      snapToGrid={true}
      fitView
      defaultViewport={{ x: 400, y: 390, zoom: 0.3 }}
      snapGrid={snapGrid}
      attributionPosition="bottom-left"
      maxZoom={4}
      minZoom={0.3}
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
  const dispatch = useDispatch();
  if (currentDocument) {
    return (
      <div className="container">
        <div className="mindmap-container">
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
          <div className="node-details-container">
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
