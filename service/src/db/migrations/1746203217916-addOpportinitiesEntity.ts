import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOpportinitiesEntity1746203217916 implements MigrationInterface {
  name = 'AddOpportinitiesEntity1746203217916';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`organization_opportunities\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`category\` enum ('level1', 'level2', 'oem', 'production_assembly', 'next_resource') NOT NULL, \`description\` varchar(500) NULL, \`priority\` enum ('low', 'medium', 'high') NOT NULL, \`organization_id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_opportunities\` ADD CONSTRAINT \`FK_8beae4a1982171f4904969092aa\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organizations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`organization_opportunities\` DROP FOREIGN KEY \`FK_8beae4a1982171f4904969092aa\``,
    );
    await queryRunner.query(`DROP TABLE \`organization_opportunities\``);
  }
}
