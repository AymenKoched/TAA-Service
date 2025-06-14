import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserAdherence1749736319178 implements MigrationInterface {
  name = 'AddUserAdherence1749736319178';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`is_active\` \`adherence\` tinyint NOT NULL DEFAULT '1'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`adherence\` \`adherence\` tinyint NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`adherence\` \`adherence\` tinyint NOT NULL DEFAULT '1'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`adherence\` \`is_active\` tinyint NOT NULL DEFAULT '1'`,
    );
  }
}
