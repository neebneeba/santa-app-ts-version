"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// I created this file to initialize an Axios instance and call the API from the backend.
const axios_1 = __importDefault(require("axios"));
const axiosInstance = axios_1.default.create({
    baseURL: import.meta.env.VITE_ORIGIN,
});
exports.default = axiosInstance;
