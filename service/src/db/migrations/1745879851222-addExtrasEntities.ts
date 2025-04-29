import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddExtrasEntities1745879851222 implements MigrationInterface {
  name = 'AddExtrasEntities1745879851222';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`organization_attributes\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`value\` varchar(255) NOT NULL, \`type\` enum ('investment', 'esg', 'partnerships', 'technologies') NOT NULL, \`organization_id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`organization_initiatives\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`impact\` varchar(255) NOT NULL, \`organization_id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`organization_r&d_projects\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`objectif\` varchar(255) NULL, \`organization_id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`organization_researches_developments\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`budget_2024\` int NULL, \`patents_count\` int NULL, \`revenue_percentage\` int NULL, \`university_partnerships\` tinyint NULL, \`projects_in_progress\` int NULL, \`organization_id\` varchar(255) NOT NULL, UNIQUE INDEX \`REL_85c29f855d469bba46ab2fbb64\` (\`organization_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`type\` enum ('old', 'new') NOT NULL DEFAULT 'old'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_tags\` CHANGE \`type\` \`type\` enum ('r&d', 'other_locations', 'certification') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`ngp\` \`ngp\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_attributes\` ADD CONSTRAINT \`FK_229359767389e84b1d5daaca7f1\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organizations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_initiatives\` ADD CONSTRAINT \`FK_ddee129f938d3ae1da56ab2fffe\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organizations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_r&d_projects\` ADD CONSTRAINT \`FK_2a891c5e3a28b0867d8d5e4995e\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organizations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_researches_developments\` ADD CONSTRAINT \`FK_85c29f855d469bba46ab2fbb645\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organizations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`organization_researches_developments\` DROP FOREIGN KEY \`FK_85c29f855d469bba46ab2fbb645\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_r&d_projects\` DROP FOREIGN KEY \`FK_2a891c5e3a28b0867d8d5e4995e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_initiatives\` DROP FOREIGN KEY \`FK_ddee129f938d3ae1da56ab2fffe\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_attributes\` DROP FOREIGN KEY \`FK_229359767389e84b1d5daaca7f1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`ngp\` \`ngp\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_tags\` CHANGE \`type\` \`type\` enum ('r&d', 'other_locations') NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`type\``);
    await queryRunner.query(
      `DROP INDEX \`REL_85c29f855d469bba46ab2fbb64\` ON \`organization_researches_developments\``,
    );
    await queryRunner.query(
      `DROP TABLE \`organization_researches_developments\``,
    );
    await queryRunner.query(`DROP TABLE \`organization_r&d_projects\``);
    await queryRunner.query(`DROP TABLE \`organization_initiatives\``);
    await queryRunner.query(`DROP TABLE \`organization_attributes\``);
  }
}
