import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddAgendorIdToUsers1613642241515 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'agendor_id',
        type: 'varchar',
        isNullable: false,
        default: '000000',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'agendor_id');
  }
}
