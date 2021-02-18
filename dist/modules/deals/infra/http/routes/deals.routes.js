"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _celebrate = require("celebrate");

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _DealsController = _interopRequireDefault(require("../controllers/DealsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dealsRouter = (0, _express.Router)();
const dealsController = new _DealsController.default();
dealsRouter.use(_ensureAuthenticated.default);
dealsRouter.post('/create', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    organization_id: _celebrate.Joi.string().required(),
    description: _celebrate.Joi.string().required(),
    value: _celebrate.Joi.number().required(),
    assFee: _celebrate.Joi.number().required(),
    bank: _celebrate.Joi.string().valid('Travelex', 'OuroInvest', 'Frente').required(),
    cet: _celebrate.Joi.number().required(),
    contract: _celebrate.Joi.number().required(),
    currency: _celebrate.Joi.string().valid('USD', 'EUR', 'GBP', 'JPY', 'CHF').required(),
    direction: _celebrate.Joi.string().valid('Entrada', 'Saída').required(),
    flow: _celebrate.Joi.string().valid('D0/D0', 'D0/D1', 'D0/D2', 'D1/D1', 'D1/D2', 'D2/D2', 'D0', 'D1', 'D2').required(),
    operationType: _celebrate.Joi.string().valid('Importação', 'Exportação', 'Disponibilidade', 'Financeiro').required(),
    r4Fee: _celebrate.Joi.number().required()
  }
}), dealsController.create);
var _default = dealsRouter;
exports.default = _default;