"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _agendor_api = _interopRequireDefault(require("../../../services/agendor_api"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IUsersRepository = _interopRequireDefault(require("../../users/repositories/IUsersRepository"));

var _IDealsRepository = _interopRequireDefault(require("../repositories/IDealsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateDealService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('DealsRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _IDealsRepository.default === "undefined" ? Object : _IDealsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateDealService {
  constructor(usersRepository, dealsRepository) {
    this.usersRepository = usersRepository;
    this.dealsRepository = dealsRepository;
  }

  getProduct(prod) {
    switch (prod) {
      case 'Exportação':
        return 93972;

      case 'Financeiro':
        return 93981;

      case 'Importação':
        return 93970;

      default:
        return 93982;
    }
  }

  async execute({
    organization_id,
    description,
    value,
    user_id,
    assFee,
    bank,
    cet,
    contract,
    currency,
    direction,
    flow,
    operationType,
    r4Fee
  }) {
    const user = await this.usersRepository.findById(user_id);
    if (!user) throw new _AppError.default('Usuário não encontrado');
    const response = await _agendor_api.default.post(`organizations/${organization_id}/deals`, {
      title: 'Fechamento de Câmbio -',
      description: description,
      value: value,
      ownerUser: user.agendor_id,
      products: [this.getProduct(operationType)]
    });
    if (!response) throw new _AppError.default('Não foi possível adicionar um novo negócio no agendor');
    const deal = await this.dealsRepository.create({
      deal_id: response.data.data.id.toString(),
      user_id: user.id,
      a_email: response.data.data._email,
      agendorOrganizationId: organization_id,
      assFee,
      bank,
      cet,
      contract,
      currency,
      direction,
      flow,
      operationType,
      ownnerId: user.agendor_id,
      r4Fee,
      value
    });
    return deal;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = CreateDealService;