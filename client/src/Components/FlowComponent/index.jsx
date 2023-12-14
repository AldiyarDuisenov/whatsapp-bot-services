import { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFunctions } from "../../redux/slices/bot";
import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";
import BotInitNode from "../../nodes/BotInitNode";
import ManagerInitNode from "../../nodes/ManagerInitNode";
import GetMessageNode from "../../nodes/GetMessageNode";
import GetOptionsNode from "../../nodes/GetOptionsNode";
import SaveToMongoNode from "../../nodes/SaveToMongoNode";
import Start from "../StartComponent";
import Confirm from "../ConfirmComponent";
import { initialNodes, initialEdges } from "../../nodes/initial-elements";

const rfStyle = {
  backgroundColor: "#B8CEFF",
};

const nodeTypes = {
  botInit: BotInitNode,
  managerInit: ManagerInitNode,
  getMessage: GetMessageNode,
  getOptions: GetOptionsNode,
  saveToMongo: SaveToMongoNode,
};

function Flow() {
  const qrcode = useSelector((state) => state.botNumSlice.qrcode);
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const dispatch = useDispatch();

  // Move the dispatch to useEffect to avoid update loop
  useEffect(() => {
    const botFunctionsArray = initialNodes.map((node) => node.function);
    dispatch(addFunctions(botFunctionsArray));
  }, [dispatch]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  return (
    <div style={{ height: "90vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        style={rfStyle}
      >
        <Panel position="bottom-right">
          <Start />
        </Panel>
      </ReactFlow>
      {qrcode !== "" ? <Confirm /> : null}
    </div>
  );
}

export default Flow;
