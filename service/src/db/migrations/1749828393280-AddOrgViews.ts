import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrgViews1749828393280 implements MigrationInterface {
  name = 'AddOrgViews1749828393280';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`organization_views\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`view_url\` varchar(255) NOT NULL, \`type\` enum ('external', 'internal') NOT NULL, \`organization_id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_views\` ADD CONSTRAINT \`FK_3d239915d6f1c6e6808352b5e05\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organizations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`organization_views\` DROP FOREIGN KEY \`FK_3d239915d6f1c6e6808352b5e05\``,
    );
    await queryRunner.query(`DROP TABLE \`organization_views\``);
  }
}
