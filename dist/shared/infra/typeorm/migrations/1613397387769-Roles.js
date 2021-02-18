"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Roles1613397387769 = void 0;

var _typeorm = require("typeorm");

class Roles1613397387769 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'roles',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'name',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'description',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('roles');
  }

}

exports.Roles1613397387769 = Roles1613397387769;