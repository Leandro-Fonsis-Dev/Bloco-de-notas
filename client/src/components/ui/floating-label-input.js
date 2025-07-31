"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloatingLabelInput = void 0;
var react_1 = require("react");
var utils_1 = require("@/lib/utils");
var FloatingLabelInput = (0, react_1.forwardRef)(function (_a, ref) {
    var className = _a.className, label = _a.label, type = _a.type, id = _a.id, props = __rest(_a, ["className", "label", "type", "id"]);
    return (<div className="relative">
        <input type={type} id={id} className={(0, utils_1.cn)("peer w-full px-3 pt-6 pb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white", className)} placeholder=" " ref={ref} {...props}/>
        <label htmlFor={id} className="absolute left-3 top-2 text-xs text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:text-xs peer-focus:top-2 peer-focus:text-primary-500">
          {label}
        </label>
      </div>);
});
exports.FloatingLabelInput = FloatingLabelInput;
FloatingLabelInput.displayName = "FloatingLabelInput";
