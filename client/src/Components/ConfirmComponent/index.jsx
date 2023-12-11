import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLaunch } from "../../redux/slices/botNumSlice";
import QRCode from "react-qr-code";
import axios from "axios";
import "./ConfirmComponent.css";

function Confirm() {
  const [qrCode, setQrCode] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/qr");
        setQrCode(response.data);
      } catch (error) {
        console.log("Error fetching QR code:", error);
      }
    };

    fetchData();
  }, [qrCode]);

  const onClick = () => {
    dispatch(setLaunch(false));
  };
  return (
    <div className="qrCode">
      <h1>Отсканируйте для входа</h1>
      <button onClick={onClick}>X</button>
      <QRCode value={qrCode} />
    </div>
  );
}

export default Confirm;
