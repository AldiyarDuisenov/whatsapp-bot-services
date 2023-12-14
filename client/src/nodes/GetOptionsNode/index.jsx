import "./GetOptionsNode.css";
import { Handle, Position } from "reactflow";

function GetOptionsNode() {
  return (
    <div className="message-option">
      <Handle type="target" position={Position.Top} />
      <p>Выбор метода ответа</p>
      <hr />
      <div style={{ display: "flex" }}>
        <p>"Напишите мне"</p>
        <p>"Позвоните мне"</p>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default GetOptionsNode;
