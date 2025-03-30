import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductsEntities1743346604373 implements MigrationInterface {
  name = 'CreateProductsEntities1743346604373';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "activities" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(100) NOT NULL, CONSTRAINT "PK_7f4004429f731ffb9c88eb486a8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_7cedae58bea000cc9a11d4541e" ON "activities" ("name") WHERE deleted_at is null and name <> ''`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."organization_activities_type_enum" AS ENUM('primary', 'secondary')`,
    );
    await queryRunner.query(
      `CREATE TABLE "organization_activities" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "type" "public"."organization_activities_type_enum" NOT NULL, "organization_id" character varying NOT NULL, "activity_id" character varying NOT NULL, CONSTRAINT "PK_e13b7949ae7df5ca4100063fec0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."organization_sites_type_enum" AS ENUM('localSite', 'foreign_implantation_site', 'foreign_exportation_site')`,
    );
    await queryRunner.query(
      `CREATE TABLE "organization_sites" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(100) NOT NULL, "capacity" integer NOT NULL, "type" "public"."organization_sites_type_enum" NOT NULL, "organization_id" character varying NOT NULL, CONSTRAINT "PK_e6f6efc3fb95ac8ada3c76b9b90" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "unique_name_organization-type" ON "organization_sites" ("name", "organization_id", "type") WHERE deleted_at is null and name <> ''`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(100) NOT NULL, "description" text, "ngp" character varying NOT NULL, "organization_id" character varying NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "unique_product_name_organization" ON "products" ("name", "organization_id") WHERE deleted_at is null and name <> ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_activities" ADD CONSTRAINT "FK_a3246bd1f31de02452aa5e2561d" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_activities" ADD CONSTRAINT "FK_fe300651e7bca25f3233cec4ffb" FOREIGN KEY ("activity_id") REFERENCES "activities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_sites" ADD CONSTRAINT "FK_c56cfc423e0da7f7246515f9d4d" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_2d404aa7aa4a0404eafd1840915" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_2d404aa7aa4a0404eafd1840915"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_sites" DROP CONSTRAINT "FK_c56cfc423e0da7f7246515f9d4d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_activities" DROP CONSTRAINT "FK_fe300651e7bca25f3233cec4ffb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_activities" DROP CONSTRAINT "FK_a3246bd1f31de02452aa5e2561d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."unique_product_name_organization"`,
    );
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(
      `DROP INDEX "public"."unique_name_organization-type"`,
    );
    await queryRunner.query(`DROP TABLE "organization_sites"`);
    await queryRunner.query(
      `DROP TYPE "public"."organization_sites_type_enum"`,
    );
    await queryRunner.query(`DROP TABLE "organization_activities"`);
    await queryRunner.query(
      `DROP TYPE "public"."organization_activities_type_enum"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7cedae58bea000cc9a11d4541e"`,
    );
    await queryRunner.query(`DROP TABLE "activities"`);
  }
}
