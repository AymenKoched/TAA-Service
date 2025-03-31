import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductsEntities1743383070577 implements MigrationInterface {
  name = 'CreateProductsEntities1743383070577';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_84015a28b6c51d16cf75e7cfb4"`,
    );
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
      `ALTER TABLE "organization_tags" DROP COLUMN "type"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."organization_tags_type_enum" AS ENUM('r&d', 'other_locations')`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_tags" ADD "type" "public"."organization_tags_type_enum" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."roles_accesses_enum" RENAME TO "roles_accesses_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."roles_accesses_enum" AS ENUM('super_admin', 'create_org', 'update_org', 'delete_org', 'view_org', 'create_user', 'update_user', 'delete_user', 'view_user', 'view_activity')`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" ALTER COLUMN "accesses" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" ALTER COLUMN "accesses" TYPE "public"."roles_accesses_enum"[] USING "accesses"::"text"::"public"."roles_accesses_enum"[]`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" ALTER COLUMN "accesses" SET DEFAULT '{}'`,
    );
    await queryRunner.query(`DROP TYPE "public"."roles_accesses_enum_old"`);
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
      `CREATE TYPE "public"."roles_accesses_enum_old" AS ENUM('super_admin', 'create_org', 'update_org', 'delete_org', 'view_org', 'create_user', 'update_user', 'delete_user', 'view_user')`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" ALTER COLUMN "accesses" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" ALTER COLUMN "accesses" TYPE "public"."roles_accesses_enum_old"[] USING "accesses"::"text"::"public"."roles_accesses_enum_old"[]`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" ALTER COLUMN "accesses" SET DEFAULT '{}'`,
    );
    await queryRunner.query(`DROP TYPE "public"."roles_accesses_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."roles_accesses_enum_old" RENAME TO "roles_accesses_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_tags" DROP COLUMN "type"`,
    );
    await queryRunner.query(`DROP TYPE "public"."organization_tags_type_enum"`);
    await queryRunner.query(
      `ALTER TABLE "organization_tags" ADD "type" character varying NOT NULL`,
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
    await queryRunner.query(
      `CREATE INDEX "IDX_84015a28b6c51d16cf75e7cfb4" ON "organization_tags" ("type") `,
    );
  }
}
