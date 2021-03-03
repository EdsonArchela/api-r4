import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeToDealAndCreationOfBankTable1614788575597 implements MigrationInterface {
    name = 'ChangeToDealAndCreationOfBankTable1614788575597'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deals" ADD "invoice" character varying`);
        await queryRunner.query(`ALTER TABLE "deals" ADD "contractDocumment" character varying`);
        await queryRunner.query(`ALTER TABLE "deals" ADD "swift" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "swift"`);
        await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "contractDocumment"`);
        await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "invoice"`);
    }

}
