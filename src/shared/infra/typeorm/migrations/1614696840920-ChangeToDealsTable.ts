import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeToDealsTable1614696840920 implements MigrationInterface {
    name = 'ChangeToDealsTable1614696840920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deals" ADD "agendorPeopleId" character varying`);
        await queryRunner.query(`ALTER TABLE "deals" ALTER COLUMN "agendorOrganizationId" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "deals"."agendorOrganizationId" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "deals"."agendorOrganizationId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "deals" ALTER COLUMN "agendorOrganizationId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "agendorPeopleId"`);
    }

}
