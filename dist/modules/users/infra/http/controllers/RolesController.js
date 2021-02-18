"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateRolesService = _interopRequireDefault(require("../../../services/CreateRolesService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RolesController {
  async create(request, response) {
    const {
      name,
      description,
      permissions
    } = request.body;

    const rolesService = _tsyringe.container.resolve(_CreateRolesService.default);

    const roles = await rolesService.execute({
      name,
      description,
      permissions
    });
    return response.json(roles);
  }

}

var _default = RolesController;
exports.default = _default;