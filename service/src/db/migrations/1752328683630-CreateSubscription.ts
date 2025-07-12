import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSubscription1752328683630 implements MigrationInterface {
  name = 'CreateSubscription1752328683630';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`client_requests\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(100) NOT NULL, \`email\` varchar(200) NOT NULL, \`phone\` varchar(100) NULL, \`location\` varchar(100) NULL, \`subscription_id\` varchar(255) NOT NULL, \`duration_days\` int NULL, UNIQUE INDEX \`IDX_e8446e44e28d64c0fde3078624\` (\`phone\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`subscriptions\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(100) NOT NULL, \`description\` text NULL, \`price\` int NULL, \`organizationHiddenFields\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_subscriptions\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`client_id\` varchar(255) NOT NULL, \`subscription_id\` varchar(255) NOT NULL, \`activation_date\` datetime NOT NULL, \`duration_days\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`roles\` ADD \`isAdminRole\` tinyint NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE \`client_requests\` ADD CONSTRAINT \`FK_692c5f3e8a97b47f18e58197c02\` FOREIGN KEY (\`subscription_id\`) REFERENCES \`subscriptions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_subscriptions\` ADD CONSTRAINT \`FK_17d01c8268c086353fb805a9fe9\` FOREIGN KEY (\`client_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_subscriptions\` ADD CONSTRAINT \`FK_f86b815c53c558058190e4b3026\` FOREIGN KEY (\`subscription_id\`) REFERENCES \`subscriptions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_subscriptions\` DROP FOREIGN KEY \`FK_f86b815c53c558058190e4b3026\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_subscriptions\` DROP FOREIGN KEY \`FK_17d01c8268c086353fb805a9fe9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`client_requests\` DROP FOREIGN KEY \`FK_692c5f3e8a97b47f18e58197c02\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`roles\` DROP COLUMN \`isAdminRole\``,
    );
    await queryRunner.query(`DROP TABLE \`user_subscriptions\``);
    await queryRunner.query(`DROP TABLE \`subscriptions\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_e8446e44e28d64c0fde3078624\` ON \`client_requests\``,
    );
    await queryRunner.query(`DROP TABLE \`client_requests\``);
  }
}
