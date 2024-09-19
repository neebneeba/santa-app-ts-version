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
const api_1 = __importDefault(require("../api"));
const store_1 = __importDefault(require("../store"));
function getUsers() {
    return api_1.default.get("users.json");
}
function getUserProfiles() {
    return api_1.default.get("userProfiles.json");
}
function getCombinedUserData() {
    return __awaiter(this, void 0, void 0, function* () {
        const [usersResponse, profilesResponse] = yield Promise.all([
            getUsers(),
            getUserProfiles(),
        ]);
        const users = usersResponse.data;
        const profiles = profilesResponse.data;
        // this will combine users data with profile data then return
        return users.map((user) => {
            const profile = profiles.find((profile) => profile.userUid === user.uid);
            const userRequests = store_1.default.getSentReadyRequestByUserId(user.uid);
            return Object.assign(Object.assign({}, user), { address: profile ? profile.address : null, birthdate: profile ? profile.birthdate : null, requests: userRequests });
        });
        // return combinedData;
    });
}
exports.default = {
    getUsers,
    getUserProfiles,
    getCombinedUserData,
};
