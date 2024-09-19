"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
const react_router_dom_1 = require("react-router-dom");
// Router
const router_1 = __importDefault(require("./router"));
// CSS
require("./index.css");
client_1.default.createRoot(document.getElementById("root")).render(<react_1.default.StrictMode>
    <react_router_dom_1.RouterProvider router={router_1.default}/>
  </react_1.default.StrictMode>);
