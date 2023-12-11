import { MarkerType } from "reactflow";

export const initialNodes = [
  {
    id: "1",
    type: "botInit",
    position: { x: 0, y: 0 },
    data: { value: 123 },
  },
  {
    id: "2",
    data: {
      label: (
        <div className="get-message">
          <p>Ожидание сообщения</p>
          <hr />
          <p>"Консультация"</p>
        </div>
      ),
    },
    position: { x: 15, y: 100 },
  },
  {
    id: "3",
    role: "getResponceType",
    data: {
      label: (
        <div className="message-option">
          <p>Выбор метода ответа</p>
          <hr />
          <div style={{ display: "flex" }}>
            <p>"Напишите мне"</p>
            <p>"Позвоните мне"</p>
          </div>
        </div>
      ),
    },
    position: { x: 15, y: 200 },
  },
  {
    id: "4",
    role: "saveToDB",
    data: {
      label: (
        <div className="save-db">
          <p>Сохранить в базу данных</p>
          <hr />
          <p>"Mongo DB"</p>
        </div>
      ),
    },
    position: { x: 15, y: 300 },
  },
  {
    id: "5",
    type: "managerInit",
    position: { x: 0, y: 400 },
  },
];

export const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];
