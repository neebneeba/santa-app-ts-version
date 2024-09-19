"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// For form validation
const react_hook_form_1 = require("react-hook-form");
const yup_1 = require("@hookform/resolvers/yup");
const yup = __importStar(require("yup"));
// // React router dom
const react_router_dom_1 = require("react-router-dom");
// Just for alert, too lazy to write it on my own.
const alert_1 = require("alert");
// Axios
const api_1 = __importDefault(require("../../api"));
const schema = yup
    .object({
    uid: yup.string().uuid().required(),
    request: yup.string().required(),
})
    .required();
const FormForSanta = () => {
    var _a, _b;
    const navigate = (0, react_router_dom_1.useNavigate)();
    // Schema-based validation
    // I thought it does not necessary to create any state.
    const { register, handleSubmit, formState: { errors }, } = (0, react_hook_form_1.useForm)({
        resolver: (0, yup_1.yupResolver)(schema),
    });
    // This function sends user request to santa.
    const onSubmit = (data) => {
        api_1.default
            .post("send-request", data)
            .then(() => {
            navigate("/request-sent");
        })
            .catch((e) => {
            if (e.response) {
                (0, alert_1.toast)(e.response.data);
            }
            throw e;
        });
    };
    return (<form className="flex flex-col justify-between w-full max-w-[500px] m-auto p-10 bg-white rounded shadow-lg h-full max-h-[600px]" onSubmit={handleSubmit(onSubmit)}>
      {/* This component will display alert when form submitted */}
      <alert_1.Toaster position="top-right" options={{
            style: {
                whiteSpace: "pre-line",
            },
        }}/>

      <div className="flex flex-col space-y-5">
        {/* User id section */}
        <div className="flex flex-col">
          <label htmlFor="userId">User ID</label>
          <input id="userId" type="text" className="border h-10 rounded px-2 outline-none focus:border-black" placeholder="Enter your id" {...register("uid")}/>
          <p>{(_a = errors.uid) === null || _a === void 0 ? void 0 : _a.message}</p>
        </div>

        {/* User request for santa */}
        <div className="flex flex-col">
          <label htmlFor="userRequest">User Request</label>
          <textarea id="userRequest" className="border rounded p-2 outline-none focus:border-black" cols={40} {...register("request")}/>
          <p>{(_b = errors.request) === null || _b === void 0 ? void 0 : _b.message}</p>
        </div>
      </div>

      {/* Form submittion */}
      <button type="submit" className="bg-blue-500 font-bold uppercase py-5 rounded text-white">
        Send your wish 🌠
      </button>
    </form>);
};
exports.default = FormForSanta;
