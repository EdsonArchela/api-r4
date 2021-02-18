"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreatePermissionsRoles1613400460574 = void 0;

var _typeorm = require("typeorm");

class CreatePermissionsRoles1613400460574 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'permissions_roles',
      columns: [{
        name: 'role_id',
        type: 'uuid'
      }, {
        name: 'permission_id',
        type: 'uuid'
      }]
    }));
    await queryRunner.createForeignKey('permissions_roles', new _typeorm.TableForeignKey({
      columnNames: ['permission_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'permissions',
      name: 'fk_permission_roles',
      onDelete: 'CASCADE',
      onUpdate: 'SET NULL'
    }));
    await queryRunner.createForeignKey('permissions_roles', new _typeorm.TableForeignKey({
      columnNames: ['role_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'roles',
      name: 'fk_roles_permission',
      onDelete: 'CASCADE',
      onUpdate: 'SET NULL'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('permissions_roles', 'fk_roles_permission');
    await queryRunner.dropForeignKey('permissions_roles', 'fk_permission_roles');
    await queryRunner.dropTable('permissions_roles');
  }

}

exports.CreatePermissionsRoles1613400460574 = CreatePermissionsRoles1613400460574;