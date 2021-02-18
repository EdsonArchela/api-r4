"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IPermissionRepository = _interopRequireDefault(require("../repositories/IPermissionRepository"));

var _IRolesRepository = _interopRequireDefault(require("../repositories/IRolesRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateRolesService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('RolesRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('PermissionRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IRolesRepository.default === "undefined" ? Object : _IRolesRepository.default, typeof _IPermissionRepository.default === "undefined" ? Object : _IPermissionRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateRolesService {
  constructor(RolesRepository, PermissionRepository) {
    this.RolesRepository = RolesRepository;
    this.PermissionRepository = PermissionRepository;
  }

  async execute({
    name,
    description,
    permissions
  }) {
    const existRoles = await this.RolesRepository.findByName(name);
    if (existRoles) throw new _AppError.default('Role já cadastrado');
    const existsPermissions = await this.PermissionRepository.findThose(permissions);
    if (!existsPermissions) throw new _AppError.default('Não pude encontrar sua permissão');
    const roles = await this.RolesRepository.create({
      name,
      description,
      permissions: existsPermissions
    });
    return roles;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = CreateRolesService;
exports.default = _default;