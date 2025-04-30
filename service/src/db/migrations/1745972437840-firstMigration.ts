import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstMigration1745972437840 implements MigrationInterface {
  name = 'FirstMigration1745972437840';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`countries_participation\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`country\` varchar(255) NOT NULL, \`count\` int NOT NULL, \`organization_id\` varchar(255) NOT NULL, UNIQUE INDEX \`unique_organizationId_country\` (\`organization_id\`, \`country\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`activities\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(100) NOT NULL, UNIQUE INDEX \`IDX_7cedae58bea000cc9a11d4541e\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`organization_activities\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`type\` enum ('primary', 'secondary') NOT NULL, \`organization_id\` varchar(255) NOT NULL, \`activity_id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`organization_age_kpis\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`count_18_24\` int NOT NULL DEFAULT '0', \`count_25_30\` int NOT NULL DEFAULT '0', \`count_31_36\` int NOT NULL DEFAULT '0', \`count_37_plus\` int NOT NULL DEFAULT '0', \`organization_id\` varchar(255) NOT NULL, UNIQUE INDEX \`REL_58c324750f94d26660fb9c7f18\` (\`organization_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`organization_attributes\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`value\` varchar(255) NOT NULL, \`type\` enum ('investment', 'esg', 'partnerships', 'technologies') NOT NULL, \`organization_id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`organization_clients\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`type\` varchar(255) NOT NULL, \`count\` int NOT NULL, \`example\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, \`organization_id\` varchar(255) NOT NULL, UNIQUE INDEX \`unique_client_organizationId_type\` (\`organization_id\`, \`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`organization_contracts\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`type\` enum ('cdi', 'cdd', 'internship', 'other') NOT NULL, \`men\` int NOT NULL, \`women\` int NOT NULL, \`organization_id\` varchar(255) NOT NULL, UNIQUE INDEX \`unique_contract_organizationId_type\` (\`organization_id\`, \`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`organization_employees_kpis\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`type\` enum ('direct', 'indirect') NOT NULL, \`men\` int NOT NULL, \`women\` int NOT NULL, \`organization_id\` varchar(255) NOT NULL, UNIQUE INDEX \`unique_emp_kpi_organizationId_type\` (\`organization_id\`, \`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`organization_formation_kpis\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`men_hours\` int NULL, \`women_hours\` int NULL, \`main_formation\` varchar(255) NULL, \`location\` varchar(100) NULL, \`type\` varchar(150) NULL, \`employees_trained\` varchar(100) NULL, \`revenue_investment\` varchar(100) NULL, \`organization_id\` varchar(255) NOT NULL, UNIQUE INDEX \`REL_1cd623565e1c52c85f96e6e3a4\` (\`organization_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
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
      `CREATE TABLE \`organization_revenue_kpis\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`type\` varchar(150) NOT NULL, \`men\` int NOT NULL, \`women\` int NOT NULL, \`organization_id\` varchar(255) NOT NULL, UNIQUE INDEX \`unique_rev_kpi_organizationId_type\` (\`organization_id\`, \`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`organization_sites\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(100) NOT NULL, \`capacity\` int NOT NULL, \`type\` enum ('localSite', 'foreign_implantation_site', 'foreign_exportation_site') NOT NULL, \`organization_id\` varchar(255) NOT NULL, UNIQUE INDEX \`unique_name_organization-type\` (\`name\`, \`organization_id\`, \`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`organization_tags\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`type\` enum ('r&d', 'other_locations', 'certification') NOT NULL, \`organization_id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`organization_turnovers\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`revenue2024\` decimal NULL, \`hasGrowthComparedTo2023\` tinyint NULL DEFAULT 0, \`growthRate\` int NULL, \`rAndDInvestment2023\` int NULL, \`grantsReceived\` int NULL, \`productionVolume\` int NULL, \`organization_id\` varchar(255) NOT NULL, UNIQUE INDEX \`REL_c1ab97666c8f9a2a6328a809b8\` (\`organization_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`organization_turnovers_distributions\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`type\` varchar(255) NOT NULL, \`count\` int NOT NULL, \`organization_id\` varchar(255) NOT NULL, UNIQUE INDEX \`unique_turnover_organizationId_type\` (\`organization_id\`, \`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`products\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(100) NOT NULL, \`description\` text NULL, \`ngp\` varchar(255) NULL, \`type\` enum ('old', 'new') NOT NULL DEFAULT 'old', \`organization_id\` varchar(255) NOT NULL, UNIQUE INDEX \`unique_product_name_organization\` (\`name\`, \`organization_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`organizations\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(100) NOT NULL, \`email\` varchar(200) NOT NULL, \`adherent_id\` varchar(255) NULL, \`full_name\` varchar(150) NULL, \`head_office\` varchar(100) NULL, \`tax_number\` varchar(100) NULL, \`website_url\` varchar(150) NULL, \`phone\` varchar(100) NULL, \`address\` varchar(100) NULL, \`postal_code\` varchar(100) NULL, \`city\` varchar(100) NULL, \`country\` varchar(100) NULL, \`founding_year\` int NULL, \`description\` text NULL, \`legal_status\` varchar(100) NULL, \`group_affiliation\` varchar(150) NULL, \`linkedin_url\` varchar(150) NULL, \`facebook_url\` varchar(150) NULL, \`twitter_url\` varchar(150) NULL, UNIQUE INDEX \`IDX_eb6b3d20dc836e153f08cef79a\` (\`email\`), UNIQUE INDEX \`IDX_99de5ef06cbc83f9b7e3d97589\` (\`phone\`), UNIQUE INDEX \`REL_ac3e17894c72ff93a3875d5101\` (\`adherent_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
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
      `ALTER TABLE \`countries_participation\` ADD CONSTRAINT \`FK_514134ee7065393050569359bc5\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organizations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE \`organization_attributes\` ADD CONSTRAINT \`FK_229359767389e84b1d5daaca7f1\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organizations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_clients\` ADD CONSTRAINT \`FK_d265cc0f0cc9c88132ec78d1ea6\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organizations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE \`organization_initiatives\` ADD CONSTRAINT \`FK_ddee129f938d3ae1da56ab2fffe\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organizations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_r&d_projects\` ADD CONSTRAINT \`FK_2a891c5e3a28b0867d8d5e4995e\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organizations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_researches_developments\` ADD CONSTRAINT \`FK_85c29f855d469bba46ab2fbb645\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organizations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE \`organization_turnovers\` ADD CONSTRAINT \`FK_c1ab97666c8f9a2a6328a809b84\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organizations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_turnovers_distributions\` ADD CONSTRAINT \`FK_ac894782c470281486a5b4b8d42\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organizations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE \`organization_turnovers_distributions\` DROP FOREIGN KEY \`FK_ac894782c470281486a5b4b8d42\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_turnovers\` DROP FOREIGN KEY \`FK_c1ab97666c8f9a2a6328a809b84\``,
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
      `ALTER TABLE \`organization_researches_developments\` DROP FOREIGN KEY \`FK_85c29f855d469bba46ab2fbb645\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_r&d_projects\` DROP FOREIGN KEY \`FK_2a891c5e3a28b0867d8d5e4995e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_initiatives\` DROP FOREIGN KEY \`FK_ddee129f938d3ae1da56ab2fffe\``,
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
      `ALTER TABLE \`organization_clients\` DROP FOREIGN KEY \`FK_d265cc0f0cc9c88132ec78d1ea6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_attributes\` DROP FOREIGN KEY \`FK_229359767389e84b1d5daaca7f1\``,
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
      `ALTER TABLE \`countries_participation\` DROP FOREIGN KEY \`FK_514134ee7065393050569359bc5\``,
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
    await queryRunner.query(
      `DROP INDEX \`REL_ac3e17894c72ff93a3875d5101\` ON \`organizations\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_99de5ef06cbc83f9b7e3d97589\` ON \`organizations\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_eb6b3d20dc836e153f08cef79a\` ON \`organizations\``,
    );
    await queryRunner.query(`DROP TABLE \`organizations\``);
    await queryRunner.query(
      `DROP INDEX \`unique_product_name_organization\` ON \`products\``,
    );
    await queryRunner.query(`DROP TABLE \`products\``);
    await queryRunner.query(
      `DROP INDEX \`unique_turnover_organizationId_type\` ON \`organization_turnovers_distributions\``,
    );
    await queryRunner.query(
      `DROP TABLE \`organization_turnovers_distributions\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_c1ab97666c8f9a2a6328a809b8\` ON \`organization_turnovers\``,
    );
    await queryRunner.query(`DROP TABLE \`organization_turnovers\``);
    await queryRunner.query(`DROP TABLE \`organization_tags\``);
    await queryRunner.query(
      `DROP INDEX \`unique_name_organization-type\` ON \`organization_sites\``,
    );
    await queryRunner.query(`DROP TABLE \`organization_sites\``);
    await queryRunner.query(
      `DROP INDEX \`unique_rev_kpi_organizationId_type\` ON \`organization_revenue_kpis\``,
    );
    await queryRunner.query(`DROP TABLE \`organization_revenue_kpis\``);
    await queryRunner.query(
      `DROP INDEX \`REL_85c29f855d469bba46ab2fbb64\` ON \`organization_researches_developments\``,
    );
    await queryRunner.query(
      `DROP TABLE \`organization_researches_developments\``,
    );
    await queryRunner.query(`DROP TABLE \`organization_r&d_projects\``);
    await queryRunner.query(`DROP TABLE \`organization_initiatives\``);
    await queryRunner.query(
      `DROP INDEX \`REL_1cd623565e1c52c85f96e6e3a4\` ON \`organization_formation_kpis\``,
    );
    await queryRunner.query(`DROP TABLE \`organization_formation_kpis\``);
    await queryRunner.query(
      `DROP INDEX \`unique_emp_kpi_organizationId_type\` ON \`organization_employees_kpis\``,
    );
    await queryRunner.query(`DROP TABLE \`organization_employees_kpis\``);
    await queryRunner.query(
      `DROP INDEX \`unique_contract_organizationId_type\` ON \`organization_contracts\``,
    );
    await queryRunner.query(`DROP TABLE \`organization_contracts\``);
    await queryRunner.query(
      `DROP INDEX \`unique_client_organizationId_type\` ON \`organization_clients\``,
    );
    await queryRunner.query(`DROP TABLE \`organization_clients\``);
    await queryRunner.query(`DROP TABLE \`organization_attributes\``);
    await queryRunner.query(
      `DROP INDEX \`REL_58c324750f94d26660fb9c7f18\` ON \`organization_age_kpis\``,
    );
    await queryRunner.query(`DROP TABLE \`organization_age_kpis\``);
    await queryRunner.query(`DROP TABLE \`organization_activities\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_7cedae58bea000cc9a11d4541e\` ON \`activities\``,
    );
    await queryRunner.query(`DROP TABLE \`activities\``);
    await queryRunner.query(
      `DROP INDEX \`unique_organizationId_country\` ON \`countries_participation\``,
    );
    await queryRunner.query(`DROP TABLE \`countries_participation\``);
  }
}
