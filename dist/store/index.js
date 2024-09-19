"use strict";
// In memory storage, consider this file as database.
Object.defineProperty(exports, "__esModule", { value: true });
const userRequests = [];
function addRequest(data) {
    userRequests.push(data);
}
// Fetches sent ready request by user Id
function getSentReadyRequestByUserId(uid) {
    return userRequests.filter((request) => request.uid === uid && request.isSent === false);
}
// Changes state of the request to true
function changeStateOfRequestById(id) {
    const item = userRequests.find((item) => item.requestId === id);
    if (item) {
        item.isSent = true;
    }
}
exports.default = {
    userRequests,
    addRequest,
    getSentReadyRequestByUserId,
    changeStateOfRequestById,
};
