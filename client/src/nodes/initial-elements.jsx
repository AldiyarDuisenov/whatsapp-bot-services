import { MarkerType } from "reactflow";
import botInitNode from "./BotInitNode/node.jsx";
import managerInitNode from "./ManagerInitNode/node.jsx";
import getMessageNode from "./GetMessageNode/node.jsx";
import getOptionsNode from "./GetOptionsNode/node.jsx";
import saveToMongoNode from "./SaveToMongoNode/node.jsx";
import "../css/nodes.css";

export const initialNodes = [
  botInitNode,
  getMessageNode,
  getOptionsNode,
  managerInitNode,
  saveToMongoNode,
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
