import {MigrationInterface, QueryRunner} from "typeorm";

export class CreationOfPartnersAndOrganizationAndUserAlteration1614439613329 implements MigrationInterface {
    name = 'CreationOfPartnersAndOrganizationAndUserAlteration1614439613329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "partners" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "agendor_id" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "operationFee" integer NOT NULL, "indicationFee" integer NOT NULL, "phone" character varying NOT NULL, "description" character varying NOT NULL, "userId" uuid, CONSTRAINT "REL_153a88a7708ead965846a8e048" UNIQUE ("userId"), CONSTRAINT "PK_998645b20820e4ab99aeae03b41" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "organizations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "agendor_id" character varying NOT NULL, "name" character varying NOT NULL, "cnpj" character varying NOT NULL, "email" character varying NOT NULL, "description" character varying NOT NULL, "website" character varying NOT NULL, "_webUrl" character varying NOT NULL, "link" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "ownerUserId" uuid, "partnerId" uuid, CONSTRAINT "REL_830f6deb6c9ef6f7332d8d4e91" UNIQUE ("partnerId"), CONSTRAINT "PK_6b031fcd0863e3f6b44230163f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permissions_roles" ("role_id" uuid NOT NULL, "permission_id" uuid NOT NULL, CONSTRAINT "PK_838ed6e68b01d6912fa682bedef" PRIMARY KEY ("role_id", "permission_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e08f6859eaac8cbf7f087f64e2" ON "permissions_roles" ("role_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_3309f5fa8d95935f0701027f2b" ON "permissions_roles" ("permission_id") `);
        await queryRunner.query(`CREATE TABLE "users_roles" ("user_id" uuid NOT NULL, "role_id" uuid NOT NULL, CONSTRAINT "PK_c525e9373d63035b9919e578a9c" PRIMARY KEY ("user_id", "role_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e4435209df12bc1f001e536017" ON "users_roles" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_1cf664021f00b9cc1ff95e17de" ON "users_roles" ("role_id") `);
        await queryRunner.query(`ALTER TABLE "users" ADD "agendor_id" character varying`);
        await queryRunner.query(`ALTER TABLE "permissions" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "permissions"."description" IS NULL`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "roles"."description" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "comission"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "comission" integer`);
        await queryRunner.query(`ALTER TABLE "partners" ADD CONSTRAINT "FK_153a88a7708ead965846a8e048b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE SET NULL`);
        await queryRunner.query(`ALTER TABLE "organizations" ADD CONSTRAINT "FK_6f104971ec857d041f7fc3f97d8" FOREIGN KEY ("ownerUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE SET NULL`);
        await queryRunner.query(`ALTER TABLE "organizations" ADD CONSTRAINT "FK_830f6deb6c9ef6f7332d8d4e911" FOREIGN KEY ("partnerId") REFERENCES "partners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permissions_roles" ADD CONSTRAINT "FK_e08f6859eaac8cbf7f087f64e2b" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permissions_roles" ADD CONSTRAINT "FK_3309f5fa8d95935f0701027f2bd" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_roles" ADD CONSTRAINT "FK_e4435209df12bc1f001e5360174" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_roles" ADD CONSTRAINT "FK_1cf664021f00b9cc1ff95e17de4" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_roles" ADD CONSTRAINT "FK_e4435209df12bc1f001e5360174" FOREIGN KEY ("user_id") REFERENCES "partners"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_roles" DROP CONSTRAINT "FK_e4435209df12bc1f001e5360174"`);
        await queryRunner.query(`ALTER TABLE "users_roles" DROP CONSTRAINT "FK_1cf664021f00b9cc1ff95e17de4"`);
        await queryRunner.query(`ALTER TABLE "users_roles" DROP CONSTRAINT "FK_e4435209df12bc1f001e5360174"`);
        await queryRunner.query(`ALTER TABLE "permissions_roles" DROP CONSTRAINT "FK_3309f5fa8d95935f0701027f2bd"`);
        await queryRunner.query(`ALTER TABLE "permissions_roles" DROP CONSTRAINT "FK_e08f6859eaac8cbf7f087f64e2b"`);
        await queryRunner.query(`ALTER TABLE "organizations" DROP CONSTRAINT "FK_830f6deb6c9ef6f7332d8d4e911"`);
        await queryRunner.query(`ALTER TABLE "organizations" DROP CONSTRAINT "FK_6f104971ec857d041f7fc3f97d8"`);
        await queryRunner.query(`ALTER TABLE "partners" DROP CONSTRAINT "FK_153a88a7708ead965846a8e048b"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "comission"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "comission" double precision`);
        await queryRunner.query(`COMMENT ON COLUMN "roles"."description" IS NULL`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "permissions"."description" IS NULL`);
        await queryRunner.query(`ALTER TABLE "permissions" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "agendor_id"`);
        await queryRunner.query(`DROP INDEX "IDX_1cf664021f00b9cc1ff95e17de"`);
        await queryRunner.query(`DROP INDEX "IDX_e4435209df12bc1f001e536017"`);
        await queryRunner.query(`DROP TABLE "users_roles"`);
        await queryRunner.query(`DROP INDEX "IDX_3309f5fa8d95935f0701027f2b"`);
        await queryRunner.query(`DROP INDEX "IDX_e08f6859eaac8cbf7f087f64e2"`);
        await queryRunner.query(`DROP TABLE "permissions_roles"`);
        await queryRunner.query(`DROP TABLE "organizations"`);
        await queryRunner.query(`DROP TABLE "partners"`);
    }

}
