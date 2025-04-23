import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstMigration1745410734140 implements MigrationInterface {
  name = 'FirstMigration1745410734140';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`roles\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(100) NOT NULL, \`accesses\` text NOT NULL, UNIQUE INDEX \`IDX_194914767660fbb164777d7b96\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_roles\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`user_id\` varchar(255) NOT NULL, \`role_id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users_tokens\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`token\` varchar(255) NOT NULL, \`type\` enum ('activate_account', 'reset_password') NOT NULL, \`expiration_date\` timestamp NULL, \`user_id\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_d93de7398c7cc98659da022965\` (\`token\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(100) NOT NULL, \`email\` varchar(200) NOT NULL, \`password\` varchar(100) NOT NULL, \`user_type\` enum ('admin', 'client', 'adherent') NOT NULL, \`inscription_date\` date NULL, \`phone\` varchar(100) NULL, \`location\` varchar(100) NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`organization_id\` varchar(255) NULL, \`position\` varchar(100) NULL, \`type\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_2c5976093867fb0006754843e1\` (\`email\`), UNIQUE INDEX \`IDX_c06fca13bc7beb2f4fdac59f4d\` (\`phone\`), UNIQUE INDEX \`REL_21a659804ed7bf61eb91688dea\` (\`organization_id\`), INDEX \`IDX_94e2000b5f7ee1f9c491f0f8a8\` (\`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_activities\` ADD CONSTRAINT \`FK_a3246bd1f31de02452aa5e2561d\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organizations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_activities\` ADD CONSTRAINT \`FK_fe300651e7bca25f3233cec4ffb\` FOREIGN KEY (\`activity_id\`) REFERENCES \`activities\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_age_kpis\` ADD CONSTRAINT \`FK_58c324750f94d26660fb9c7f184\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organizations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_contracts\` ADD CONSTRAINT \`FK_e155b57aaec56e019290767d633\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organizations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_employees_kpis\` ADD CONSTRAINT \`FK_50979b39b3d96fbb2bbbeefa419\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organizations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_formation_kpis\` ADD CONSTRAINT \`FK_1cd623565e1c52c85f96e6e3a43\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organizations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_revenue_kpis\` ADD CONSTRAINT \`FK_70e01a3583d926647f9d37075b8\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organizations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_sites\` ADD CONSTRAINT \`FK_c56cfc423e0da7f7246515f9d4d\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organizations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_tags\` ADD CONSTRAINT \`FK_33679a5d517e9b46b9219175def\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organizations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_2d404aa7aa4a0404eafd1840915\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organizations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organizations\` ADD CONSTRAINT \`FK_ac3e17894c72ff93a3875d51014\` FOREIGN KEY (\`adherent_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_roles\` ADD CONSTRAINT \`FK_87b8888186ca9769c960e926870\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_roles\` ADD CONSTRAINT \`FK_b23c65e50a758245a33ee35fda1\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_tokens\` ADD CONSTRAINT \`FK_32f96022cc5076fe565a5cba20b\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_21a659804ed7bf61eb91688dea7\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organizations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_21a659804ed7bf61eb91688dea7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_tokens\` DROP FOREIGN KEY \`FK_32f96022cc5076fe565a5cba20b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_roles\` DROP FOREIGN KEY \`FK_b23c65e50a758245a33ee35fda1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_roles\` DROP FOREIGN KEY \`FK_87b8888186ca9769c960e926870\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organizations\` DROP FOREIGN KEY \`FK_ac3e17894c72ff93a3875d51014\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_2d404aa7aa4a0404eafd1840915\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_tags\` DROP FOREIGN KEY \`FK_33679a5d517e9b46b9219175def\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_sites\` DROP FOREIGN KEY \`FK_c56cfc423e0da7f7246515f9d4d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_revenue_kpis\` DROP FOREIGN KEY \`FK_70e01a3583d926647f9d37075b8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_formation_kpis\` DROP FOREIGN KEY \`FK_1cd623565e1c52c85f96e6e3a43\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_employees_kpis\` DROP FOREIGN KEY \`FK_50979b39b3d96fbb2bbbeefa419\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_contracts\` DROP FOREIGN KEY \`FK_e155b57aaec56e019290767d633\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_age_kpis\` DROP FOREIGN KEY \`FK_58c324750f94d26660fb9c7f184\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_activities\` DROP FOREIGN KEY \`FK_fe300651e7bca25f3233cec4ffb\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_activities\` DROP FOREIGN KEY \`FK_a3246bd1f31de02452aa5e2561d\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_94e2000b5f7ee1f9c491f0f8a8\` ON \`users\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_21a659804ed7bf61eb91688dea\` ON \`users\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_c06fca13bc7beb2f4fdac59f4d\` ON \`users\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_2c5976093867fb0006754843e1\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_d93de7398c7cc98659da022965\` ON \`users_tokens\``,
    );
    await queryRunner.query(`DROP TABLE \`users_tokens\``);
    await queryRunner.query(`DROP TABLE \`user_roles\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_194914767660fbb164777d7b96\` ON \`roles\``,
    );
    await queryRunner.query(`DROP TABLE \`roles\``);
  }
}
