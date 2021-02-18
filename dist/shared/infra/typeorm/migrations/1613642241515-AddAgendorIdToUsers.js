"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddAgendorIdToUsers1613642241515 = void 0;

var _typeorm = require("typeorm");

class AddAgendorIdToUsers1613642241515 {
  async up(queryRunner) {
    await queryRunner.addColumn('users', new _typeorm.TableColumn({
      name: 'agendor_id',
      type: 'varchar',
      isNullable: false,
      default: '000000'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropColumn('users', 'agendor_id');
  }

}

exports.AddAgendorIdToUsers1613642241515 = AddAgendorIdToUsers1613642241515;