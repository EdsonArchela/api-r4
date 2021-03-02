import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeToPeopleTable1614699908031 implements MigrationInterface {
    name = 'ChangeToPeopleTable1614699908031'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "peoples" ALTER COLUMN "cpf" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "peoples"."cpf" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "peoples"."cpf" IS NULL`);
        await queryRunner.query(`ALTER TABLE "peoples" ALTER COLUMN "cpf" SET NOT NULL`);
    }

}
