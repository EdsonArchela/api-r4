import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeOnDirectionTypeOfDeal1614459206583 implements MigrationInterface {
    name = 'ChangeOnDirectionTypeOfDeal1614459206583'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "direction"`);
        await queryRunner.query(`ALTER TABLE "deals" ADD "direction" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "direction"`);
        await queryRunner.query(`ALTER TABLE "deals" ADD "direction" character varying NOT NULL`);
    }

}
