"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IUsersRepository = _interopRequireDefault(require("../repositories/IUsersRepository"));

var _IHashProvider = _interopRequireDefault(require("../providers/HashProvider/models/IHashProvider"));

var _IRolesRepository = _interopRequireDefault(require("../repositories/IRolesRepository"));

var _agendor_api = _interopRequireDefault(require("../../../services/agendor_api"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('RolesRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('HashProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _IRolesRepository.default === "undefined" ? Object : _IRolesRepository.default, typeof _IHashProvider.default === "undefined" ? Object : _IHashProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateUserService {
  constructor(usersRepository, RolesRepository, hashProvider) {
    this.usersRepository = usersRepository;
    this.RolesRepository = RolesRepository;
    this.hashProvider = hashProvider;
  }

  async execute({
    name,
    email,
    password,
    comission,
    roles
  }) {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new _AppError.default('E-mail já foi cadastrado');
    }

    const existsRoles = await this.RolesRepository.findThose(roles);
    if (!existsRoles) throw new _AppError.default('Não pude encontrar seu Role');
    const users = await _agendor_api.default.get('users');
    const agendorId = users.data.data.find(a_user => a_user.contact.email === email);
    if (!agendorId) throw new _AppError.default('Usuário não encontrado no Agendor');
    const hashedPassword = await this.hashProvider.generateHash(password);
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      comission,
      roles: existsRoles,
      agendor_id: agendorId.id
    });
    return user;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = CreateUserService;
exports.default = _default;