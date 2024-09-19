"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
// Pages
const home_1 = __importDefault(require("../pages/home"));
const request_sent_1 = __importDefault(require("../pages/request_sent"));
const router = (0, react_router_dom_1.createBrowserRouter)([
    {
        path: "/",
        element: <home_1.default />,
    },
    {
        path: "/request-sent",
        element: <request_sent_1.default />,
    },
]);
exports.default = router;
