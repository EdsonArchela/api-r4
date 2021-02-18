"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _UsersController = _interopRequireDefault(require("../controllers/UsersController"));

var _ensureAuthenticated = _interopRequireDefault(require("../middlewares/ensureAuthenticated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';
const usersRouter = (0, _express.Router)();
const usersController = new _UsersController.default();
usersRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().email().required(),
    password: _celebrate.Joi.string().required(),
    comission: _celebrate.Joi.number(),
    roles: _celebrate.Joi.array().items(_celebrate.Joi.string())
  }
}), usersController.create);
usersRouter.use(_ensureAuthenticated.default);
usersRouter.get('/organization', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    name: _celebrate.Joi.string(),
    cnpj: _celebrate.Joi.string()
  }
}), usersController.getOrganization); // usersRouter.patch(
//   '/cpf',
//   celebrate({
//     [Segments.BODY]: {
//       cpf: Joi.string().required(),
//     },
//   }),
//   usersController.update,
// );

var _default = usersRouter;
exports.default = _default;