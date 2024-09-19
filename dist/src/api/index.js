"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
// For calling 3th party api
const serverAxiosInstance = axios_1.default.create({
    baseURL: process.env.GITHUB_USER_CONTENT,
});
exports.default = serverAxiosInstance;
