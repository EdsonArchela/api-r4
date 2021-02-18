"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _CreateUserService = _interopRequireDefault(require("../../../services/CreateUserService"));

var _GetUsersOrganizationService = _interopRequireDefault(require("../../../services/GetUsersOrganizationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersController {
  async create(request, response) {
    const {
      name,
      email,
      password,
      comission,
      roles
    } = request.body;

    const createUserService = _tsyringe.container.resolve(_CreateUserService.default);

    const user = await createUserService.execute({
      name,
      email,
      password,
      comission,
      roles
    });
    return response.json((0, _classTransformer.classToClass)(user));
  }

  async getOrganization(request, response) {
    const {
      name,
      cnpj
    } = request.query;

    const getUsersOrganizationService = _tsyringe.container.resolve(_GetUsersOrganizationService.default);

    const organizations = await getUsersOrganizationService.execute(request.user.id, name, cnpj);
    return response.json(organizations);
  }

}

exports.default = UsersController;