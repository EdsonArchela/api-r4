"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const agendor_api = _axios.default.create({
  baseURL: process.env.REACT_APP_AGENDOR_API_URL,
  headers: {
    Authorization: `Token ${process.env.REACT_APP_AGENDOR_TOKEN}`
  }
});

var _default = agendor_api;
exports.default = _default;