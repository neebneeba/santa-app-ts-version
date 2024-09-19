"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Layout
const layout_1 = __importDefault(require("../layout"));
// Components
const form_1 = __importDefault(require("../components/home/form"));
const Home = () => {
    return (<layout_1.default>
      <div className="container flex h-full">
        <form_1.default />
      </div>
    </layout_1.default>);
};
exports.default = Home;
