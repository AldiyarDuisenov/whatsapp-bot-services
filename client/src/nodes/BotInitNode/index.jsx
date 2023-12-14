import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setBotNum, setManager } from "../../redux/slices/bot";
import "./BotInitNode.css";

function BotInitNode() {
  const dispatch = useDispatch();
  const botNumber = useSelector((state) => state.botNumSlice.botNumber);
  const url = useSelector((state) => state.botNumSlice.url);

  const onChange = useCallback((evt) => {
    dispatch(setBotNum(evt.target.value));
  }, []);

  async function setBot() {
    if (botNumber && botNumber.length === 11 && botNumber[0] === "7") {
      try {
        dispatch(setManager([]));
        const response = await axios.post(`${url}/bot`, {
          botNumber: botNumber,
        });
        alert(response.data.message || "Бот создан");
        const managers = response.data.bot.managers;
        if (managers) {
          dispatch(setManager(managers));
        }
      } catch (error) {
        console.log("Ошибка запроса:", error);
      }
    } else {
      alert(`Данные внесены не верно: ${botNumber}`);
    }
  }

  return (
    <div className="bot-init">
      <p>Инициализация бота</p>
      <div>
        <label htmlFor="text">Введите номер телефона</label>
        <input
          id="text"
          name="text"
          onChange={onChange}
          className="nodrag"
          placeholder={botNumber}
        />
      </div>
      <button onClick={setBot}>сохранить</button>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default BotInitNode;
