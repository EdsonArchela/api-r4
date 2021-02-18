"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateDeals1613650477955 = void 0;

var _typeorm = require("typeorm");

class CreateDeals1613650477955 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'deals',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'deal_id',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'ownnerId',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'agendorOrganizationId',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'a_email',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'operationType',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'bank',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'currency',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'direction',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'flow',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'value',
        type: 'float8',
        isNullable: false
      }, {
        name: 'assFee',
        type: 'float8',
        isNullable: false
      }, {
        name: 'r4Fee',
        type: 'float8',
        isNullable: false
      }, {
        name: 'contract',
        type: 'float8',
        isNullable: false
      }, {
        name: 'cet',
        type: 'float8',
        isNullable: false
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'user_id',
        type: 'uuid',
        isNullable: true
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('deals');
  }

}

exports.CreateDeals1613650477955 = CreateDeals1613650477955;