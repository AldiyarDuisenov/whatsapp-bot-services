import { useSelector, useDispatch } from "react-redux";
import QRCode from "react-qr-code";
import { setQrcode } from "../../redux/slices/bot";
import "./ConfirmComponent.css";

function Confirm() {
  const qrcode = useSelector((state) => state.botNumSlice.qrcode);
  const dispatch = useDispatch();
  function onClick() {
    dispatch(setQrcode(""));
  }

  return (
    <div className="qrCode">
      <h1>Отсканируйте для входа</h1>
      <button onClick={() => onClick()}>X</button>
      <QRCode value={qrcode} />
    </div>
  );
}

export default Confirm;
