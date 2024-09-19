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
const nodemailer_1 = __importDefault(require("nodemailer"));
const store_1 = __importDefault(require("../store"));
const _1 = __importDefault(require("."));
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.ETHEREAL_USERNAME,
        pass: process.env.ETHEREAL_PASSWORD,
    },
});
// This function sends all requests to smpt server that has not sent status
function sendRequestsToSmtpServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const combinedUserData = yield _1.default.getCombinedUserData();
        yield Promise.all(combinedUserData.map((user) => __awaiter(this, void 0, void 0, function* () {
            yield user.requests.map((request) => __awaiter(this, void 0, void 0, function* () {
                if (!request.isSent && user.address) {
                    const info = yield transporter.sendMail({
                        from: "do_not_reply@northpole.com",
                        to: "santa@northpole.com",
                        subject: `USERNAME: ${user.username}, ADDRESS: ${user.address}`,
                        text: request.request,
                    });
                    store_1.default.changeStateOfRequestById(request.requestId);
                }
            }));
        }))).catch((e) => {
            throw new Error(e);
        });
    });
}
exports.default = sendRequestsToSmtpServer;
