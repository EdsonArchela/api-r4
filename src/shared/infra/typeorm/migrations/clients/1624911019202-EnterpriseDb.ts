import {MigrationInterface, QueryRunner} from "typeorm";

export class EnterpriseDb1624911019202 implements MigrationInterface {
    name = 'EnterpriseDb1624911019202'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "socios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying, "cnhFront" character varying, "cnhBack" character varying, "rgFront" character varying, "rgBack" character varying, "cpfFront" character varying, "cpfBack" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "enterpriseId" uuid, CONSTRAINT "PK_19aa081436e91864ec86a4bf912" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "kycs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "contactName" character varying NOT NULL, "contactEmail" character varying NOT NULL, "contactPhone" character varying NOT NULL, "q1" character varying NOT NULL, "q2" character varying NOT NULL, "q3" character varying NOT NULL, "q4" character varying NOT NULL, "q5" character varying NOT NULL, "q6" character varying NOT NULL, "q7" character varying NOT NULL, "q8" character varying NOT NULL, "q9" character varying NOT NULL, "q10" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6e61a5975007a8dae889765bbbf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "enterprise" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "documment" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "agendor_id" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "patrimonialBalance" character varying, "revenues" character varying, "dre" character varying, "socialContract" character varying, "addressDocumment" character varying, CONSTRAINT "PK_09687cd306dc5d486c0e227c471" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "socios" ADD CONSTRAINT "FK_846d23f60126dbca0dacc2c6299" FOREIGN KEY ("enterpriseId") REFERENCES "enterprise"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "socios" DROP CONSTRAINT "FK_846d23f60126dbca0dacc2c6299"`);
        await queryRunner.query(`DROP TABLE "enterprise"`);
        await queryRunner.query(`DROP TABLE "kycs"`);
        await queryRunner.query(`DROP TABLE "socios"`);
    }

}
