import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePeoplesTableAndChangeToDealsTable1614693289106 implements MigrationInterface {
    name = 'CreatePeoplesTableAndChangeToDealsTable1614693289106'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "peoples" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "agendor_id" character varying NOT NULL, "name" character varying NOT NULL, "cpf" character varying NOT NULL, "organization" character varying, "email" character varying, "description" character varying, "website" character varying, "_webUrl" character varying, "link" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "ownerUserId" uuid, "partnerId" uuid, "dealsId" uuid, CONSTRAINT "REL_cbaa1cb8203a5c777389d9b3f8" UNIQUE ("partnerId"), CONSTRAINT "PK_6e07258072dcc27e4935e1f075e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "peoples" ADD CONSTRAINT "FK_6b47402051b66606aa2024eb9c9" FOREIGN KEY ("ownerUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE SET NULL`);
        await queryRunner.query(`ALTER TABLE "peoples" ADD CONSTRAINT "FK_cbaa1cb8203a5c777389d9b3f81" FOREIGN KEY ("partnerId") REFERENCES "partners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "peoples" ADD CONSTRAINT "FK_3371338be0f4269b401b8d49c94" FOREIGN KEY ("dealsId") REFERENCES "deals"("id") ON DELETE CASCADE ON UPDATE SET NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "peoples" DROP CONSTRAINT "FK_3371338be0f4269b401b8d49c94"`);
        await queryRunner.query(`ALTER TABLE "peoples" DROP CONSTRAINT "FK_cbaa1cb8203a5c777389d9b3f81"`);
        await queryRunner.query(`ALTER TABLE "peoples" DROP CONSTRAINT "FK_6b47402051b66606aa2024eb9c9"`);
        await queryRunner.query(`DROP TABLE "peoples"`);
    }

}
