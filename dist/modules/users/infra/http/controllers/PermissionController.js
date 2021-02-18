"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreatePermissionService = _interopRequireDefault(require("../../../services/CreatePermissionService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PermissionController {
  async create(request, response) {
    const {
      name,
      description
    } = request.body;

    const permissionService = _tsyringe.container.resolve(_CreatePermissionService.default);

    const permission = await permissionService.execute({
      name,
      description
    });
    return response.json(permission);
  }

}

var _default = PermissionController;
exports.default = _default;