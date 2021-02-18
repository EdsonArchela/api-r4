"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _users = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/users.routes"));

var _sessions = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/sessions.routes"));

var _permissions = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/permissions.routes"));

var _roles = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/roles.routes"));

var _deals = _interopRequireDefault(require("../../../../modules/deals/infra/http/routes/deals.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use('/users', _users.default);
routes.use('/sessions', _sessions.default);
routes.use('/permissions', _permissions.default);
routes.use('/roles', _roles.default);
routes.use('/deals', _deals.default);
var _default = routes;
exports.default = _default;