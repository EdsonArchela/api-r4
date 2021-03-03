import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeBanksAndUsers1614788941051 implements MigrationInterface {
    name = 'ChangeBanksAndUsers1614788941051'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "banks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "bankNumber" character varying NOT NULL, "agency" character varying NOT NULL, "account" character varying NOT NULL, "iban" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "ownerUserId" uuid, CONSTRAINT "PK_3975b5f684ec241e3901db62d77" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "banks" ADD CONSTRAINT "FK_2e3c50a47e8c26c468698f1a58f" FOREIGN KEY ("ownerUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE SET NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "banks" DROP CONSTRAINT "FK_2e3c50a47e8c26c468698f1a58f"`);
        await queryRunner.query(`DROP TABLE "banks"`);
    }

}
