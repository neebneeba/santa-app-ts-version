"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
// Controller
const controller_1 = __importDefault(require("../controller"));
const router = (0, express_1.Router)();
// ==============================================================================================================================
// Get requests
router.get("/get-requests", controller_1.default.getRequests);
// ==============================================================================================================================
// ==============================================================================================================================
// Post requests
router.post("/send-request", 
// Validating request body
(0, express_validator_1.body)("uid").isUUID(), (0, express_validator_1.body)("request").isString(), controller_1.default.saveRequest);
// ==============================================================================================================================
exports.default = router;
