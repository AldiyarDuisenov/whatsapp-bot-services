import "./GetMessageNode.css";
import { Handle, Position } from "reactflow";

function GetMessageNode() {
  return (
    <div className="get-message">
      <Handle type="target" position={Position.Top} />
      <p>Ожидание сообщения</p>
      <hr />
      <p>"Консультация"</p>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default GetMessageNode;
