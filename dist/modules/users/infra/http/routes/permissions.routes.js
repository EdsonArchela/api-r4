"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _celebrate = require("celebrate");

var _express = require("express");

var _PermissionController = _interopRequireDefault(require("../controllers/PermissionController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const permissionRouter = (0, _express.Router)();
const permissionController = new _PermissionController.default();
permissionRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    description: _celebrate.Joi.string()
  }
}), permissionController.create);
var _default = permissionRouter;
exports.default = _default;