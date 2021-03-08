import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeInBank1615214014754 implements MigrationInterface {
    name = 'ChangeInBank1615214014754'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "banks" DROP CONSTRAINT "FK_2e3c50a47e8c26c468698f1a58f"`);
        await queryRunner.query(`ALTER TABLE "banks" RENAME COLUMN "ownerUserId" TO "agendorId"`);
        await queryRunner.query(`ALTER TABLE "banks" DROP COLUMN "agendorId"`);
        await queryRunner.query(`ALTER TABLE "banks" ADD "agendorId" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "banks" DROP COLUMN "agendorId"`);
        await queryRunner.query(`ALTER TABLE "banks" ADD "agendorId" uuid`);
        await queryRunner.query(`ALTER TABLE "banks" RENAME COLUMN "agendorId" TO "ownerUserId"`);
        await queryRunner.query(`ALTER TABLE "banks" ADD CONSTRAINT "FK_2e3c50a47e8c26c468698f1a58f" FOREIGN KEY ("ownerUserId") REFERENCES "peoples"("id") ON DELETE CASCADE ON UPDATE SET NULL`);
    }

}
