"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = is;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

var _EnsureUserRole = _interopRequireDefault(require("../../../services/EnsureUserRole"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function is(roles) {
  const roleAuthorized = async (request, response, next) => {
    const userRoleService = _tsyringe.container.resolve(_EnsureUserRole.default);

    const hasRole = await userRoleService.execute({
      id: request.user.id,
      roles
    });
    if (!hasRole) throw new _AppError.default('Usuário não possui assesso.', 401);
    return next();
  };
}