"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_1 = __importDefault(require("./app"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(app_1.default);
app.listen(7000, () => {
    console.log('Server started on http://localhost:7000');
});
