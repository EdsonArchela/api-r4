"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Permissions = _interopRequireDefault(require("../entities/Permissions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PermissionRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Permissions.default);
  }

  async create({
    name,
    description
  }) {
    const permission = this.ormRepository.create({
      name,
      description
    });
    await this.ormRepository.save(permission);
    return permission;
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

var _default = PermissionRepository;
exports.default = _default;