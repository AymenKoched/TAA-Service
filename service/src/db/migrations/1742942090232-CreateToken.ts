import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateToken1742942090232 implements MigrationInterface {
  name = 'CreateToken1742942090232';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users_tokens" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "token" character varying NOT NULL, "name" character varying NOT NULL, "expiration_date" TIMESTAMP, "user_id" character varying NOT NULL, CONSTRAINT "PK_9f236389174a6ccbd746f53dca8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_d93de7398c7cc98659da022965" ON "users_tokens" ("token") WHERE deleted_at is null and token <> ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_tokens" ADD CONSTRAINT "FK_32f96022cc5076fe565a5cba20b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_tokens" DROP CONSTRAINT "FK_32f96022cc5076fe565a5cba20b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d93de7398c7cc98659da022965"`,
    );
    await queryRunner.query(`DROP TABLE "users_tokens"`);
  }
}
