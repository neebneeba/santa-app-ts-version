"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Init server
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const node_cron_1 = __importDefault(require("node-cron"));
// Service
const mail_1 = __importDefault(require("./service/mail"));
// Router
const route_1 = __importDefault(require("./route"));
const app = (0, express_1.default)();
// Server configuration
app.use(express_1.default.static(path_1.default.join(__dirname, "frontend"))); // this is frontend's build folder and serves as static file
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)("common"));
app.use((0, cors_1.default)({
    origin: process.env.ORIGIN, // for enabling cors
}));
// Inject routers
app.use("/", route_1.default);
// Cron job runs every 15 seconds
node_cron_1.default.schedule("*/15 * * * * *", () => {
    (0, mail_1.default)();
    console.log("Running a task every 15 seconds");
});
// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
    console.log("Your app is listening on port: " + process.env.PORT);
});
