import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Button } from "@chakra-ui/react";
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
import {
  getVisibleNodes,
  getVisibleEdges,
} from "../selectors/mindmapDataSelector";
import { toggleIsNodeDetailsVisible } from "../actions/nodeDetailsActions";
import { BiSolidShow } from "react-icons/bi";
import { GrFormViewHide } from "react-icons/gr";
import "../styles/Mindmap.scss";

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
  GraphNodes: getVisibleNodes(mindmap.nodes, mindmap.edges, mindmap.rootId),
  GraphEdges: getVisibleEdges(mindmap.nodes, mindmap.edges, mindmap.rootId),
  selectedNodeId: mindmap.selectedNodeId,
  isNodeDetailsVisible: nodeDetails.isNodeDetailsVisible,
});

const mapDispatchToProps = {
  toggleIsNodeDetailsVisible,
};

export default connect(mapStateToProps, mapDispatchToProps)(Mindmap);
