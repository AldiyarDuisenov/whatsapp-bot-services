import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import { useDispatch } from "react-redux";
import { setBotNum } from "../redux/slices/botNumSlice";

function BotInitNode() {
  const dispatch = useDispatch();
  const onChange = useCallback((evt) => {
    dispatch(setBotNum(evt.target.value));
  }, []);

  return (
    <div className="bot-init">
      <p>Инициализация бота</p>
      <div>
        <label htmlFor="text">Введите номер телефона</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default BotInitNode;
