import { useSelector, useDispatch } from "react-redux";
import { setQrcode } from "../../redux/slices/bot";
import "./StartModule.css";
import axios from "axios";

function Start() {
  const dispatch = useDispatch();
  const botNumber = useSelector((state) => state.botNumSlice.botNumber);
  const managers = useSelector((state) => state.botNumSlice.managers);
  const url = useSelector((state) => state.botNumSlice.url);
  const botFunctions = useSelector((state) => state.botNumSlice.botFunctions);

  const startBot = async () => {
    alert("Бот скоро будет запущен");
    if (botNumber && managers) {
      try {
        const response = await axios.post(`${url}/startbot`, {
          botNumber: botNumber,
          botFunctions: botFunctions,
        });
        if (response.data === "Бот запущен") {
          alert(response.data);
        } else {
          dispatch(setQrcode(response.data));
        }
      } catch (error) {
        console.log("Ошибка запроса:", error);
      }
    }
  };
  return (
    <button className="start" onClick={() => startBot()}>
      Start
    </button>
  );
}

export default Start;
