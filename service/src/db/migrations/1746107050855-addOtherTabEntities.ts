import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOtherTabEntities1746107050855 implements MigrationInterface {
  name = 'AddOtherTabEntities1746107050855';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`organization_environments\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`electricity\` varchar(200) NULL, \`electricity_consumption\` varchar(100) NULL, \`has_water_plant\` tinyint NULL DEFAULT 0, \`water_consumption\` varchar(100) NULL, \`recyclable_percentage\` varchar(100) NULL, \`eco_designed\` tinyint NULL, \`internal_revaluation\` tinyint NULL, \`local_recovery_rate\` varchar(100) NULL, \`export_rate\` varchar(100) NULL, \`production_integration_rate\` varchar(100) NULL, \`has_develop_products\` tinyint NULL, \`has_develop_processes\` tinyint NULL, \`has_develop_markets\` tinyint NULL, \`has_open_innovation\` tinyint NULL, \`technical_know_how\` text NULL, \`organization_id\` varchar(255) NOT NULL, UNIQUE INDEX \`REL_7f887a7292ae5fa8a2b76dd1a6\` (\`organization_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`organization_questions\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`question\` varchar(255) NOT NULL, \`response\` varchar(255) NOT NULL, \`details\` varchar(255) NULL, \`organization_id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`organization_waste_distributions\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`plastic\` int NULL, \`metallic\` int NULL, \`textiles_and_leather\` int NULL, \`oils\` int NULL, \`papers_and_cardboard\` int NULL, \`hazardous\` int NULL, \`others\` int NULL, \`organization_id\` varchar(255) NOT NULL, UNIQUE INDEX \`REL_fb0caee10b225828bf21159ccc\` (\`organization_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_environments\` ADD CONSTRAINT \`FK_7f887a7292ae5fa8a2b76dd1a62\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organizations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_questions\` ADD CONSTRAINT \`FK_4d43a968972f4d1ef0decd6d9c4\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organizations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_waste_distributions\` ADD CONSTRAINT \`FK_fb0caee10b225828bf21159cccf\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organizations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`organization_waste_distributions\` DROP FOREIGN KEY \`FK_fb0caee10b225828bf21159cccf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_questions\` DROP FOREIGN KEY \`FK_4d43a968972f4d1ef0decd6d9c4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_environments\` DROP FOREIGN KEY \`FK_7f887a7292ae5fa8a2b76dd1a62\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_fb0caee10b225828bf21159ccc\` ON \`organization_waste_distributions\``,
    );
    await queryRunner.query(`DROP TABLE \`organization_waste_distributions\``);
    await queryRunner.query(`DROP TABLE \`organization_questions\``);
    await queryRunner.query(
      `DROP INDEX \`REL_7f887a7292ae5fa8a2b76dd1a6\` ON \`organization_environments\``,
    );
    await queryRunner.query(`DROP TABLE \`organization_environments\``);
  }
}
