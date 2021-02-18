"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateDealService = _interopRequireDefault(require("../../../services/CreateDealService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DealsController {
  async create(request, response) {
    const data = request.body;

    const createDealService = _tsyringe.container.resolve(_CreateDealService.default);

    const deal = await createDealService.execute({ ...data,
      user_id: request.user.id
    });
    return response.json(deal);
  }

}

exports.default = DealsController;