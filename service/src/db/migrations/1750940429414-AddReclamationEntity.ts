import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddReclamationEntity1750940429414 implements MigrationInterface {
  name = 'AddReclamationEntity1750940429414';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users_reclamations\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`type\` enum ('modification') NOT NULL, \`priority\` enum ('low', 'medium', 'high') NULL, \`state\` enum ('pending', 'accepted', 'rejected') NOT NULL, \`start_date\` datetime NOT NULL, \`window_days\` int NOT NULL, \`description\` text NULL, \`file_url\` varchar(255) NULL, \`adherent_id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`modification_start_date\` datetime NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`modification_end_date\` datetime NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_reclamations\` ADD CONSTRAINT \`FK_7a7dbcc8fb06d68ecfb7210c7a8\` FOREIGN KEY (\`adherent_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users_reclamations\` DROP FOREIGN KEY \`FK_7a7dbcc8fb06d68ecfb7210c7a8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`modification_end_date\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`modification_start_date\``,
    );
    await queryRunner.query(`DROP TABLE \`users_reclamations\``);
  }
}
