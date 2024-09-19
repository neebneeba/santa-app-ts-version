"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// App's main layout for header footer background etc.
const Layout = ({ children }) => {
    return (<div className="py-5 h-screen bg-gradient-to-tr from-blue-300 to-blue-500">
      {children}
    </div>);
};
exports.default = Layout;
