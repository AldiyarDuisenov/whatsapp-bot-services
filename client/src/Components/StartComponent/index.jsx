import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLaunch } from "../../redux/slices/botNumSlice";
import "./StartModule.css";
import axios from "axios";

function Start() {
  const dispatch = useDispatch();
  const phoneNumber = useSelector((state) => state.botNumSlice.phoneNumber);
  const managers = useSelector((state) => state.botNumSlice.managers);

  const url = "http://localhost:8080/bot";

  const postData = async () => {
    if (
      phoneNumber &&
      Object.keys(managers).length &&
      Object.values(managers).some((e) => e)
    ) {
      dispatch(setLaunch(true));
      try {
        const response = await axios.post(url, {
          botNumber: phoneNumber,
          managers: Object.values(managers),
        });
        console.log("Ответ сервера:", response.data);
      } catch (error) {
        console.log("Ошибка запроса:", error);
      }
    }
  };
  return <button onClick={() => postData()}>Start</button>;
}

export default Start;
