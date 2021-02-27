import {MigrationInterface, QueryRunner} from "typeorm";

export class AutoChangePartnerPhoneAndDescriptionNullable1614442858510 implements MigrationInterface {
    name = 'AutoChangePartnerPhoneAndDescriptionNullable1614442858510'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "partners" ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "partners"."phone" IS NULL`);
        await queryRunner.query(`ALTER TABLE "partners" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "partners"."description" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "partners"."description" IS NULL`);
        await queryRunner.query(`ALTER TABLE "partners" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "partners"."phone" IS NULL`);
        await queryRunner.query(`ALTER TABLE "partners" ALTER COLUMN "phone" SET NOT NULL`);
    }

}
