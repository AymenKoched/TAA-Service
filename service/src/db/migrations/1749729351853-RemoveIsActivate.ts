import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveIsActivate1749729351853 implements MigrationInterface {
  name = 'RemoveIsActivate1749729351853';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`is_active\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`is_active\` tinyint NOT NULL DEFAULT '1'`,
    );
  }
}
