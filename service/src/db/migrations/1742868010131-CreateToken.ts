import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateToken1742868010131 implements MigrationInterface {
  name = 'CreateToken1742868010131';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tokens" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "token" character varying NOT NULL, "name" character varying NOT NULL, "expiration_date" date NOT NULL, "user_id" character varying NOT NULL, CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_6025a42d5188ded20ae6b9408c" ON "tokens" ("token") WHERE deleted_at is null and token <> ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "tokens" ADD CONSTRAINT "FK_8769073e38c365f315426554ca5" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tokens" DROP CONSTRAINT "FK_8769073e38c365f315426554ca5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6025a42d5188ded20ae6b9408c"`,
    );
    await queryRunner.query(`DROP TABLE "tokens"`);
  }
}
