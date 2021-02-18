"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IPermissionRepository = _interopRequireDefault(require("../repositories/IPermissionRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreatePermissionService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PermissionRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IPermissionRepository.default === "undefined" ? Object : _IPermissionRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreatePermissionService {
  constructor(permissionRepository) {
    this.permissionRepository = permissionRepository;
  }

  async execute({
    name,
    description
  }) {
    const existPermission = await this.permissionRepository.findByName(name);
    if (existPermission) throw new _AppError.default('Permissão já cadastrada');
    const permission = await this.permissionRepository.create({
      name,
      description
    });
    return permission;
  }

}) || _class) || _class) || _class) || _class);
var _default = CreatePermissionService;
exports.default = _default;