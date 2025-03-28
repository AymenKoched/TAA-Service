import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrganization1743125415355 implements MigrationInterface {
  name = 'CreateOrganization1743125415355';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_60b4fcc83e7713c917d6dd7736"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_tokens" RENAME COLUMN "name" TO "type"`,
    );
    await queryRunner.query(
      `CREATE TABLE "organization_tags" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "organization_id" character varying NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_abc93dd6bbd24dd5d798de37cfa" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_84015a28b6c51d16cf75e7cfb4" ON "organization_tags" ("type") `,
    );
    await queryRunner.query(
      `CREATE TABLE "organizations" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(100) NOT NULL, "email" character varying(200) NOT NULL, "adherent_id" character varying, "full_name" character varying(150), "head_office" character varying(100), "tax_number" character varying(100), "website_url" character varying(150), "phone" character varying(100), "address" character varying(100), "postal_code" character varying(100), "city" character varying(100), "country" character varying(100), "founding_year" integer, "description" text, "legal_status" character varying(100), "group_affiliation" character varying(150), "linkedin_url" character varying(150), "facebook_url" character varying(150), "twitter_url" character varying(150), CONSTRAINT "REL_ac3e17894c72ff93a3875d5101" UNIQUE ("adherent_id"), CONSTRAINT "PK_6b031fcd0863e3f6b44230163f9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_7133ef8aacf7a839bdc2119675" ON "organizations" ("name") WHERE deleted_at is null and name <> ''`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_eb6b3d20dc836e153f08cef79a" ON "organizations" ("email") WHERE deleted_at is null and email <> ''`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_99de5ef06cbc83f9b7e3d97589" ON "organizations" ("phone") WHERE deleted_at is null and phone <> ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "organization_id" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_21a659804ed7bf61eb91688dea7" UNIQUE ("organization_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "position" character varying(100)`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."roles_accesses_enum" RENAME TO "roles_accesses_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."roles_accesses_enum" AS ENUM('super_admin', 'create_org', 'update_org', 'delete_org', 'view_org', 'create_user', 'update_user', 'delete_user', 'view_user')`,
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
    await queryRunner.query(`ALTER TABLE "users_tokens" DROP COLUMN "type"`);
    await queryRunner.query(
      `CREATE TYPE "public"."users_tokens_type_enum" AS ENUM('activate_account', 'reset_password')`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_tokens" ADD "type" "public"."users_tokens_type_enum" NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_194914767660fbb164777d7b96" ON "roles" ("name") WHERE deleted_at is null and name <> ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_tags" ADD CONSTRAINT "FK_33679a5d517e9b46b9219175def" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "organizations" ADD CONSTRAINT "FK_ac3e17894c72ff93a3875d51014" FOREIGN KEY ("adherent_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_21a659804ed7bf61eb91688dea7" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_21a659804ed7bf61eb91688dea7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organizations" DROP CONSTRAINT "FK_ac3e17894c72ff93a3875d51014"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_tags" DROP CONSTRAINT "FK_33679a5d517e9b46b9219175def"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_194914767660fbb164777d7b96"`,
    );
    await queryRunner.query(`ALTER TABLE "users_tokens" DROP COLUMN "type"`);
    await queryRunner.query(`DROP TYPE "public"."users_tokens_type_enum"`);
    await queryRunner.query(
      `ALTER TABLE "users_tokens" ADD "type" character varying NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."roles_accesses_enum_old" AS ENUM('super_admin_access', 'create_org', 'update_org', 'delete_org', 'view_org', 'create_user', 'update_user', 'delete_user', 'view_user')`,
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
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "position"`);
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_21a659804ed7bf61eb91688dea7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "organization_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_99de5ef06cbc83f9b7e3d97589"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_eb6b3d20dc836e153f08cef79a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7133ef8aacf7a839bdc2119675"`,
    );
    await queryRunner.query(`DROP TABLE "organizations"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_84015a28b6c51d16cf75e7cfb4"`,
    );
    await queryRunner.query(`DROP TABLE "organization_tags"`);
    await queryRunner.query(
      `ALTER TABLE "users_tokens" RENAME COLUMN "type" TO "name"`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_60b4fcc83e7713c917d6dd7736" ON "roles" ("name") WHERE (deleted_at IS NULL)`,
    );
  }
}
