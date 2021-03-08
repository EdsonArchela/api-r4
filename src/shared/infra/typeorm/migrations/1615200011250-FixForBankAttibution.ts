import {MigrationInterface, QueryRunner} from "typeorm";

export class FixForBankAttibution1615200011250 implements MigrationInterface {
    name = 'FixForBankAttibution1615200011250'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "banks" DROP CONSTRAINT "FK_2e3c50a47e8c26c468698f1a58f"`);
        await queryRunner.query(`ALTER TABLE "banks" ADD CONSTRAINT "FK_2e3c50a47e8c26c468698f1a58f" FOREIGN KEY ("ownerUserId") REFERENCES "peoples"("id") ON DELETE CASCADE ON UPDATE SET NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "banks" DROP CONSTRAINT "FK_2e3c50a47e8c26c468698f1a58f"`);
        await queryRunner.query(`ALTER TABLE "banks" ADD CONSTRAINT "FK_2e3c50a47e8c26c468698f1a58f" FOREIGN KEY ("ownerUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE SET NULL`);
    }

}
