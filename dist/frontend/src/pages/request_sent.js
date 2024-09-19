"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// React router dom
const react_router_dom_1 = require("react-router-dom");
// Layout
const layout_1 = __importDefault(require("../layout"));
const RequestSent = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    return (<layout_1.default>
      <div className="flex h-full">
        <div className="flex flex-col space-y-5 m-auto">
          <div className="m-auto text-white text-4xl font-bold">
            Dear child your request has been sent 😇
          </div>
          <button type="button" onClick={() => navigate("/")} className="border py-5 rounded text-white hover:bg-white hover:text-black transition">
            Back to form
          </button>
        </div>
      </div>
    </layout_1.default>);
};
exports.default = RequestSent;
