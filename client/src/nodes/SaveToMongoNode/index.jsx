import "./SaveToMongoNode.css";
import { Handle, Position } from "reactflow";

function GetOptionsNode() {
  return (
    <div className="save-db">
      <Handle type="target" position={Position.Top} />
      <p>Сохранить в базу данных</p>
      <hr />
      <p>"Mongo DB"</p>
    </div>
  );
}

export default GetOptionsNode;
