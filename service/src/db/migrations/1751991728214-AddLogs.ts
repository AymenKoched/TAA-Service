import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLogs1751991728214 implements MigrationInterface {
  name = 'AddLogs1751991728214';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`unique_name_organization-type\` ON \`organization_sites\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`logs\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`entity\` varchar(255) NOT NULL, \`entityId\` varchar(255) NOT NULL, \`before\` json NOT NULL, \`after\` json NOT NULL, \`reclamation_id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`photoUrl\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`last_reclamation_id\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organizations\` ADD \`logoUrl\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_tokens\` CHANGE \`type\` \`type\` enum ('reset_password') NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`unique_name_organization-type\` ON \`organization_sites\` (\`name\`, \`organization_id\`, \`type\`, \`deleted_at\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`logs\` ADD CONSTRAINT \`FK_876bc3d619ff27fead379fa7d61\` FOREIGN KEY (\`reclamation_id\`) REFERENCES \`users_reclamations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`logs\` DROP FOREIGN KEY \`FK_876bc3d619ff27fead379fa7d61\``,
    );
    await queryRunner.query(
      `DROP INDEX \`unique_name_organization-type\` ON \`organization_sites\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_tokens\` CHANGE \`type\` \`type\` enum ('activate_account', 'reset_password') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organizations\` DROP COLUMN \`logoUrl\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`last_reclamation_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP COLUMN \`photoUrl\``,
    );
    await queryRunner.query(`DROP TABLE \`logs\``);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`unique_name_organization-type\` ON \`organization_sites\` (\`name\`, \`organization_id\`, \`type\`)`,
    );
  }
}
