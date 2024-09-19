"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const store_1 = __importDefault(require("../store"));
const service_1 = __importDefault(require("../service"));
const age_calculator_1 = __importDefault(require("../utils/age_calculator"));
function saveRequest(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        // Getting validation result
        const errors = (0, express_validator_1.validationResult)(request);
        if (!errors.isEmpty()) {
            // This line adds all error messages into single text
            let errorText = "";
            errors.array().map((item) => {
                if (item.type === "field") {
                    errorText += `${item.path}: ${item.msg}\n`;
                }
            });
            return response.status(400).send(errorText);
        }
        // Fetches user profile and check if request userId exists
        const userProfiles = yield service_1.default.getUserProfiles();
        for (let item of userProfiles.data) {
            if (item.userUid === request.body.uid) {
                // Calculate age and if too old then show warning
                if ((0, age_calculator_1.default)(item.birthdate) > 10) {
                    return response
                        .status(400)
                        .send("You are too old to get a gift from santa !!!");
                }
                // Stores user request into in-memory variable
                store_1.default.addRequest({
                    requestId: store_1.default.userRequests.length + 1,
                    uid: request.body.uid,
                    request: request.body.request,
                    isSent: false,
                });
                // After saving the user request. it sends the message indicating that the request has received.
                return response.send("Successfully stored !!!");
            }
        }
        return response.status(400).send("You are not registered !!!");
    });
}
function getRequests(request, response) {
    response.send(store_1.default.userRequests);
}
exports.default = {
    saveRequest,
    getRequests,
};
