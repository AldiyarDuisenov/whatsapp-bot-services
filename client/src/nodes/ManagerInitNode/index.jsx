import { useState } from "react";
import { Handle, Position } from "reactflow";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setManager } from "../../redux/slices/bot";
import "./ManagerInitNode.css";

function ManagerInitNode() {
  const dispatch = useDispatch();
  const managers = useSelector((state) => state.botNumSlice.managers);
  const botNumber = useSelector((state) => state.botNumSlice.botNumber);
  const url = useSelector((state) => state.botNumSlice.url);
  const [manager1, setManager1] = useState();
  const [manager2, setManager2] = useState();

  const handleManager1Change = (evt) => {
    if (botNumber) {
      setManager1(evt.target.value);
    }
  };

  const handleManager2Change = (evt) => {
    if (botNumber) {
      setManager2(evt.target.value);
    }
  };

  async function setManagers(manager1, manager2) {
    const newManagers = [manager1, manager2];
    if (botNumber) {
      if (!(manager1 && manager1.length === 11 && manager1[0] === "7")) {
        alert(`Данные внесены неверно`);
        return;
      }
      if (!(manager2 && manager2.length === 11 && manager2[0] === "7")) {
        alert(`Данные внесены неверно`);
        return;
      }
      await axios.post(`${url}/setmanagers`, {
        botNumber: botNumber,
        managers: newManagers,
      });
      dispatch(setManager(newManagers));
      alert(`Менеджеры добавлены: ${newManagers}`);
    } else {
      alert("Бот не выбран");
    }
  }

  return (
    <div className="manager-init">
      <Handle type="target" position={Position.Top} />
      <p>Добавление менеджеров</p>
      <div>
        <label htmlFor="text">Введите номера телефонов</label>
        <input
          id="text"
          name="text"
          onChange={handleManager1Change}
          className="nodrag"
          placeholder={managers[0]}
        />
      </div>
      <div>
        <input
          id="text"
          name="text"
          onChange={handleManager2Change}
          className="nodrag"
          placeholder={managers[1]}
        />
      </div>
      <button className="save" onClick={() => setManagers(manager1, manager2)}>
        сохранить
      </button>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default ManagerInitNode;
