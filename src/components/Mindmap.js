import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getVisibleNodes,
  getVisibleEdges,
} from "../selectors/mindmapDataSelector";
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
import "../styles/Mindmap.scss";

const snapGrid = [20, 20];
const nodeTypes = {
  customNode: CustomNode,
};

const CustomNodeFlow = ({ GraphNodes, GraphEdges }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    setNodes(GraphNodes);
    setEdges(GraphEdges);
  }, [GraphNodes, GraphEdges]);
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      style={{ background: "#F9F7F7" }}
      nodeTypes={nodeTypes}
      snapToGrid={true}
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

const Mindmap = ({ currentDocument, GraphNodes, GraphEdges }) => {
  if (currentDocument) {
    return (
      <div className="container">
        <div className="mindmap-container">
          <ReactFlowProvider>
            <CustomNodeFlow GraphNodes={GraphNodes} GraphEdges={GraphEdges} />
          </ReactFlowProvider>
        </div>
        <div className="node-details-container">
          <NodeDetails />
        </div>
      </div>
    );
  } else {
    <div className="not-available">
      <h1>UPLOAD/SELECT A DOCUMENT TO GET STARTED</h1>
    </div>;
  }
};

const mapStateToProps = ({ currentDocument, mindmap }) => ({
  currentDocument: currentDocument.fileName,
  GraphNodes: getVisibleNodes(mindmap.nodes, mindmap.edges, mindmap.rootId),
  GraphEdges: getVisibleEdges(mindmap.nodes, mindmap.edges, mindmap.rootId),
});

export default connect(mapStateToProps)(Mindmap);
