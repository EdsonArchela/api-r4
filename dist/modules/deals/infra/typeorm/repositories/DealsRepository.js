"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Deal = _interopRequireDefault(require("../entities/Deal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DealsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Deal.default);
  }

  async create(data) {
    const deal = this.ormRepository.create(data);
    await this.ormRepository.save(deal);
    return deal;
  }

}

exports.default = DealsRepository;