import { useCallback, useState } from "react";
import { useSelector } from "react-redux";

import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";

import BotInitNode from "../../nodes/BotInitNode";
import ManagerInitNode from "../../nodes/ManagerInitNode";

import "../../css/nodes.css";

import Start from "../StartComponent";
import Confirm from "../ConfirmComponent";

import { initialNodes, initialEdges } from "../../nodes/initial-elements";

const rfStyle = {
  backgroundColor: "#B8CEFF",
};

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { botInit: BotInitNode, managerInit: ManagerInitNode };

function Flow() {
  const launch = useSelector((state) => state.botNumSlice.launch);
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <div style={{ height: "90vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        style={rfStyle}
      >
        <Panel position="bottom-right">
          <Start />
        </Panel>
      </ReactFlow>
      {launch && <Confirm />}
    </div>
  );
}

export default Flow;
