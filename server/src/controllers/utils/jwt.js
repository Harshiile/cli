"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtGenerate = exports.jwtValidate = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const jwtValidate = (token) => (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
exports.jwtValidate = jwtValidate;
const jwtGenerate = (payload) => (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET);
exports.jwtGenerate = jwtGenerate;
