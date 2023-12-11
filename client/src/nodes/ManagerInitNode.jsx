import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import { useDispatch } from "react-redux";
import { setManager } from "../redux/slices/botNumSlice";

function ManagerInitNode() {
  const dispatch = useDispatch();
  const setManager1 = useCallback((evt) => {
    dispatch(
      setManager({ manager: "manager1", phoneNumber: evt.target.value })
    );
  }, []);
  const setManager2 = useCallback((evt) => {
    dispatch(
      setManager({ manager: "manager2", phoneNumber: evt.target.value })
    );
  }, []);
  return (
    <div className="manager-init">
      <Handle type="target" position={Position.Top} />
      <p>Добавление менеджеров</p>
      <div>
        <label htmlFor="text">Введите номера телефонов</label>
        <input
          id="text"
          name="text"
          onChange={setManager1}
          className="nodrag"
        />
      </div>
      <div>
        <input
          id="text"
          name="text"
          onChange={setManager2}
          className="nodrag"
        />
      </div>
    </div>
  );
}

export default ManagerInitNode;
