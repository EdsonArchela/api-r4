"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Roles = _interopRequireDefault(require("../entities/Roles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RolesRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Roles.default);
  }

  async create({
    name,
    description,
    permissions
  }) {
    const roles = this.ormRepository.create({
      name,
      description,
      permissions
    });
    await this.ormRepository.save(roles);
    return roles;
  }

  async save(data) {
    return this.ormRepository.save(data);
  }

  async findByName(name) {
    return await this.ormRepository.findOne({
      where: {
        name
      }
    });
  }

  async findThose(ids) {
    const exists = await this.ormRepository.findByIds(ids);
    return exists;
  }

}

var _default = RolesRepository;
exports.default = _default;