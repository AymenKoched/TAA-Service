import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateHumanResourcesEntities1745078710758
  implements MigrationInterface
{
  name = 'CreateHumanResourcesEntities1745078710758';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "organization_age_kpis" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "count_18_24" integer NOT NULL DEFAULT '0', "count_25_30" integer NOT NULL DEFAULT '0', "count_31_36" integer NOT NULL DEFAULT '0', "count_37_plus" integer NOT NULL DEFAULT '0', "organization_id" character varying NOT NULL, CONSTRAINT "REL_58c324750f94d26660fb9c7f18" UNIQUE ("organization_id"), CONSTRAINT "PK_91b044df38ca924d60d231a2ded" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "organization_contracts" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "type" character varying(150) NOT NULL, "men" integer NOT NULL, "women" integer NOT NULL, "organization_id" character varying NOT NULL, CONSTRAINT "PK_813807d5cffe628153e7cb1fc98" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "unique_contract_organizationId_type" ON "organization_contracts" ("organization_id", "type") WHERE deleted_at is null`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."organization_employees_kpis_type_enum" AS ENUM('direct', 'indirect')`,
    );
    await queryRunner.query(
      `CREATE TABLE "organization_employees_kpis" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "type" "public"."organization_employees_kpis_type_enum" NOT NULL, "men" integer NOT NULL, "women" integer NOT NULL, "organization_id" character varying NOT NULL, CONSTRAINT "PK_9da5850afb0b0e2f918be141431" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "unique_emp_kpi_organizationId_type" ON "organization_employees_kpis" ("organization_id", "type") WHERE deleted_at is null`,
    );
    await queryRunner.query(
      `CREATE TABLE "organization_formation_kpis" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "men_hours" integer, "women_hours" integer, "main_formation" character varying, "location" character varying(100), "type" character varying(150), "employees_trained" character varying(100), "revenue_investment" character varying(100), "organization_id" character varying NOT NULL, CONSTRAINT "REL_1cd623565e1c52c85f96e6e3a4" UNIQUE ("organization_id"), CONSTRAINT "PK_d56c1696df3b231039f7981eaae" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "organization_revenue_kpis" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "type" character varying(150) NOT NULL, "men" integer NOT NULL, "women" integer NOT NULL, "organization_id" character varying NOT NULL, CONSTRAINT "PK_e35d23d5d9d631cdab6b9c94865" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "unique_rev_kpi_organizationId_type" ON "organization_revenue_kpis" ("organization_id", "type") WHERE deleted_at is null`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_age_kpis" ADD CONSTRAINT "FK_58c324750f94d26660fb9c7f184" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_contracts" ADD CONSTRAINT "FK_e155b57aaec56e019290767d633" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_employees_kpis" ADD CONSTRAINT "FK_50979b39b3d96fbb2bbbeefa419" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_formation_kpis" ADD CONSTRAINT "FK_1cd623565e1c52c85f96e6e3a43" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_revenue_kpis" ADD CONSTRAINT "FK_70e01a3583d926647f9d37075b8" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "organization_revenue_kpis" DROP CONSTRAINT "FK_70e01a3583d926647f9d37075b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_formation_kpis" DROP CONSTRAINT "FK_1cd623565e1c52c85f96e6e3a43"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_employees_kpis" DROP CONSTRAINT "FK_50979b39b3d96fbb2bbbeefa419"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_contracts" DROP CONSTRAINT "FK_e155b57aaec56e019290767d633"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_age_kpis" DROP CONSTRAINT "FK_58c324750f94d26660fb9c7f184"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."unique_rev_kpi_organizationId_type"`,
    );
    await queryRunner.query(`DROP TABLE "organization_revenue_kpis"`);
    await queryRunner.query(`DROP TABLE "organization_formation_kpis"`);
    await queryRunner.query(
      `DROP INDEX "public"."unique_emp_kpi_organizationId_type"`,
    );
    await queryRunner.query(`DROP TABLE "organization_employees_kpis"`);
    await queryRunner.query(
      `DROP TYPE "public"."organization_employees_kpis_type_enum"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."unique_contract_organizationId_type"`,
    );
    await queryRunner.query(`DROP TABLE "organization_contracts"`);
    await queryRunner.query(`DROP TABLE "organization_age_kpis"`);
  }
}
