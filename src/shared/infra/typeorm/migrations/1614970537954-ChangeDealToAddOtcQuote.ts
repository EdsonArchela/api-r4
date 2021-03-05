import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeDealToAddOtcQuote1614970537954 implements MigrationInterface {
    name = 'ChangeDealToAddOtcQuote1614970537954'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deals" ADD "otcQuote" double precision NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "otcQuote"`);
    }

}
