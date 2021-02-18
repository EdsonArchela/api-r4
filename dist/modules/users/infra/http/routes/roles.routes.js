"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _celebrate = require("celebrate");

var _express = require("express");

var _RolesController = _interopRequireDefault(require("../controllers/RolesController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const rolesRouter = (0, _express.Router)();
const rolesController = new _RolesController.default();
rolesRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    description: _celebrate.Joi.string(),
    permissions: _celebrate.Joi.array().items(_celebrate.Joi.string())
  }
}), rolesController.create);
var _default = rolesRouter;
exports.default = _default;