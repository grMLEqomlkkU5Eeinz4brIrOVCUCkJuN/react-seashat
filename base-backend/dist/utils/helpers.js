"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToArray = void 0;
const stringToArray = (val) => val.split(",").map((s) => s.trim()).filter(Boolean);
exports.stringToArray = stringToArray;
//# sourceMappingURL=helpers.js.map