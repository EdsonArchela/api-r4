"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUsersRoles1613402643732 = void 0;

var _typeorm = require("typeorm");

class CreateUsersRoles1613402643732 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'users_roles',
      columns: [{
        name: 'role_id',
        type: 'uuid'
      }, {
        name: 'user_id',
        type: 'uuid'
      }]
    }));
    await queryRunner.createForeignKey('users_roles', new _typeorm.TableForeignKey({
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      name: 'fk_users_roles',
      onDelete: 'CASCADE',
      onUpdate: 'SET NULL'
    }));
    await queryRunner.createForeignKey('users_roles', new _typeorm.TableForeignKey({
      columnNames: ['role_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'roles',
      name: 'fk_roles_users',
      onDelete: 'CASCADE',
      onUpdate: 'SET NULL'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('users_roles', 'fk_roles_users');
    await queryRunner.dropForeignKey('users_roles', 'fk_users_roles');
    await queryRunner.dropTable('users_roles');
  }

}

exports.CreateUsersRoles1613402643732 = CreateUsersRoles1613402643732;