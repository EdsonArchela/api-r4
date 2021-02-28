import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangesInPartnerUserRelation1614453258479 implements MigrationInterface {
    name = 'ChangesInPartnerUserRelation1614453258479'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "partners" DROP CONSTRAINT "FK_153a88a7708ead965846a8e048b"`);
        await queryRunner.query(`CREATE TABLE "deals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "agendorOrganizationId" character varying NOT NULL, "advisorId" character varying NOT NULL, "partnerId" character varying, "bank" character varying NOT NULL, "currency" character varying NOT NULL, "direction" character varying NOT NULL, "operationType" character varying NOT NULL, "flow" character varying NOT NULL, "value" double precision NOT NULL, "contract" double precision NOT NULL, "iof" double precision NOT NULL, "ptax2" double precision NOT NULL, "ptax1" double precision NOT NULL, "ir" double precision NOT NULL, "contractDiscount" double precision NOT NULL, "assFee" double precision NOT NULL, "r4Fee" double precision NOT NULL, "cet" double precision NOT NULL, "darf" double precision, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8c66f03b250f613ff8615940b4b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "deals_user_users" ("dealsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_a06cedc7b671cb9a455e4a5b861" PRIMARY KEY ("dealsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_68a7731654308843c50c4315be" ON "deals_user_users" ("dealsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5312743eb5297a3d060dc7ab32" ON "deals_user_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "organizations" ADD "dealsId" uuid`);
        await queryRunner.query(`ALTER TABLE "organizations" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "organizations"."email" IS NULL`);
        await queryRunner.query(`ALTER TABLE "organizations" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "organizations"."description" IS NULL`);
        await queryRunner.query(`ALTER TABLE "organizations" ALTER COLUMN "website" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "organizations"."website" IS NULL`);
        await queryRunner.query(`ALTER TABLE "organizations" ALTER COLUMN "_webUrl" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "organizations"."_webUrl" IS NULL`);
        await queryRunner.query(`ALTER TABLE "organizations" ALTER COLUMN "link" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "organizations"."link" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "partners"."userId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "partners" DROP CONSTRAINT "REL_153a88a7708ead965846a8e048"`);
        await queryRunner.query(`ALTER TABLE "organizations" ADD CONSTRAINT "FK_6e7c6a7acf5997eb656060a75fb" FOREIGN KEY ("dealsId") REFERENCES "deals"("id") ON DELETE CASCADE ON UPDATE SET NULL`);
        await queryRunner.query(`ALTER TABLE "partners" ADD CONSTRAINT "FK_153a88a7708ead965846a8e048b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "deals_user_users" ADD CONSTRAINT "FK_68a7731654308843c50c4315be9" FOREIGN KEY ("dealsId") REFERENCES "deals"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "deals_user_users" ADD CONSTRAINT "FK_5312743eb5297a3d060dc7ab323" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deals_user_users" DROP CONSTRAINT "FK_5312743eb5297a3d060dc7ab323"`);
        await queryRunner.query(`ALTER TABLE "deals_user_users" DROP CONSTRAINT "FK_68a7731654308843c50c4315be9"`);
        await queryRunner.query(`ALTER TABLE "partners" DROP CONSTRAINT "FK_153a88a7708ead965846a8e048b"`);
        await queryRunner.query(`ALTER TABLE "organizations" DROP CONSTRAINT "FK_6e7c6a7acf5997eb656060a75fb"`);
        await queryRunner.query(`ALTER TABLE "partners" ADD CONSTRAINT "REL_153a88a7708ead965846a8e048" UNIQUE ("userId")`);
        await queryRunner.query(`COMMENT ON COLUMN "partners"."userId" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "organizations"."link" IS NULL`);
        await queryRunner.query(`ALTER TABLE "organizations" ALTER COLUMN "link" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "organizations"."_webUrl" IS NULL`);
        await queryRunner.query(`ALTER TABLE "organizations" ALTER COLUMN "_webUrl" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "organizations"."website" IS NULL`);
        await queryRunner.query(`ALTER TABLE "organizations" ALTER COLUMN "website" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "organizations"."description" IS NULL`);
        await queryRunner.query(`ALTER TABLE "organizations" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "organizations"."email" IS NULL`);
        await queryRunner.query(`ALTER TABLE "organizations" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "organizations" DROP COLUMN "dealsId"`);
        await queryRunner.query(`DROP INDEX "IDX_5312743eb5297a3d060dc7ab32"`);
        await queryRunner.query(`DROP INDEX "IDX_68a7731654308843c50c4315be"`);
        await queryRunner.query(`DROP TABLE "deals_user_users"`);
        await queryRunner.query(`DROP TABLE "deals"`);
        await queryRunner.query(`ALTER TABLE "partners" ADD CONSTRAINT "FK_153a88a7708ead965846a8e048b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE SET NULL`);
    }

}
