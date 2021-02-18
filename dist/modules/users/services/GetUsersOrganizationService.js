"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _agendor_api = _interopRequireDefault(require("../../../services/agendor_api"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IUsersRepository = _interopRequireDefault(require("../repositories/IUsersRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let GetUsersOrganizationService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class GetUsersOrganizationService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(id, name, cnpj) {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new _AppError.default('Usuário não encontrado');
    if (!name && !cnpj) throw new _AppError.default('Digite um nome ou cnpj para a procura');
    const {
      data
    } = await _agendor_api.default.get(`/organizations?userOwener=${user.agendor_id}&per_page=100&${name ? `name=${name}` : `cnpj=${cnpj}`}`);
    return data;
  }

}) || _class) || _class) || _class) || _class);
var _default = GetUsersOrganizationService;
exports.default = _default;