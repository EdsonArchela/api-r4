"use strict";

var _tsyringe = require("tsyringe");

require("../../modules/users/providers");

var _UsersRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UsersRepository"));

var _PermisionRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/PermisionRepository"));

var _RolesRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/RolesRepository"));

var _DealsRepository = _interopRequireDefault(require("../../modules/deals/infra/typeorm/repositories/DealsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('UsersRepository', _UsersRepository.default);

_tsyringe.container.registerSingleton('PermissionRepository', _PermisionRepository.default);

_tsyringe.container.registerSingleton('RolesRepository', _RolesRepository.default);

_tsyringe.container.registerSingleton('DealsRepository', _DealsRepository.default);