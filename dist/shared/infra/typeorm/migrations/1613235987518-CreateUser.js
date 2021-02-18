"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUser1613235987518 = void 0;

var _typeorm = require("typeorm");

class CreateUser1613235987518 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'users',
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
        name: 'email',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'password',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'comission',
        type: 'float8',
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
    await queryRunner.dropTable('users');
  }

}

exports.CreateUser1613235987518 = CreateUser1613235987518;