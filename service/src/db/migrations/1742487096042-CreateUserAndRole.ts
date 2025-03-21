import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserAndRole1742487096042 implements MigrationInterface {
  name = 'CreateUserAndRole1742487096042';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."roles_accesses_enum" AS ENUM('super_admin_access', 'create_org', 'update_org', 'delete_org', 'view_org', 'create_user', 'update_user', 'delete_user', 'view_user')`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(100) NOT NULL, "accesses" "public"."roles_accesses_enum" array NOT NULL DEFAULT '{}', CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_60b4fcc83e7713c917d6dd7736" ON "roles" ("name") WHERE deleted_at is null`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_roles" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" character varying NOT NULL, "role_id" character varying NOT NULL, CONSTRAINT "PK_8acd5cf26ebd158416f477de799" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(100) NOT NULL, "email" character varying(200) NOT NULL, "password" character varying(100) NOT NULL, "inscription_date" date, "phone" character varying(100), "location" character varying(100), "type" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_2c5976093867fb0006754843e1" ON "users" ("email") WHERE deleted_at is null and email <> ''`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_c06fca13bc7beb2f4fdac59f4d" ON "users" ("phone") WHERE deleted_at is null and phone <> ''`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_94e2000b5f7ee1f9c491f0f8a8" ON "users" ("type") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" ADD CONSTRAINT "FK_87b8888186ca9769c960e926870" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" ADD CONSTRAINT "FK_b23c65e50a758245a33ee35fda1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_roles" DROP CONSTRAINT "FK_b23c65e50a758245a33ee35fda1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" DROP CONSTRAINT "FK_87b8888186ca9769c960e926870"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_94e2000b5f7ee1f9c491f0f8a8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c06fca13bc7beb2f4fdac59f4d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2c5976093867fb0006754843e1"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "user_roles"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_60b4fcc83e7713c917d6dd7736"`,
    );
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TYPE "public"."roles_accesses_enum"`);
  }
}
