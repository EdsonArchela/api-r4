import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeAddFieldsToDeal1614613031343 implements MigrationInterface {
    name = 'ChangeAddFieldsToDeal1614613031343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deals" ADD "spread" double precision NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "deals" ADD "broker" double precision`);
        await queryRunner.query(`ALTER TABLE "deals" ADD "partner" double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "partner"`);
        await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "broker"`);
        await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "spread"`);
    }

}
