import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRevenueEntities1745589759999 implements MigrationInterface {
  name = 'AddRevenueEntities1745589759999';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`countries_participation\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`country\` varchar(255) NOT NULL, \`count\` int NOT NULL, \`organization_id\` varchar(255) NOT NULL, UNIQUE INDEX \`unique_organizationId_country\` (\`organization_id\`, \`country\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`organization_clients\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`type\` varchar(255) NOT NULL, \`count\` int NOT NULL, \`example\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, \`organization_id\` varchar(255) NOT NULL, UNIQUE INDEX \`unique_client_organizationId_type\` (\`organization_id\`, \`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`organization_turnovers\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`revenue2024\` decimal NULL, \`hasGrowthComparedTo2023\` tinyint NULL DEFAULT 0, \`growthRate\` int NULL, \`rAndDInvestment2023\` int NULL, \`grantsReceived\` int NULL, \`productionVolume\` int NULL, \`organization_id\` varchar(255) NOT NULL, UNIQUE INDEX \`REL_c1ab97666c8f9a2a6328a809b8\` (\`organization_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`organization_turnovers_distributions\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`type\` varchar(255) NOT NULL, \`count\` int NOT NULL, \`organization_id\` varchar(255) NOT NULL, UNIQUE INDEX \`unique_turnover_organizationId_type\` (\`organization_id\`, \`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`countries_participation\` ADD CONSTRAINT \`FK_514134ee7065393050569359bc5\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organizations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_clients\` ADD CONSTRAINT \`FK_d265cc0f0cc9c88132ec78d1ea6\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organizations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_turnovers\` ADD CONSTRAINT \`FK_c1ab97666c8f9a2a6328a809b84\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organizations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_turnovers_distributions\` ADD CONSTRAINT \`FK_ac894782c470281486a5b4b8d42\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organizations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`organization_turnovers_distributions\` DROP FOREIGN KEY \`FK_ac894782c470281486a5b4b8d42\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_turnovers\` DROP FOREIGN KEY \`FK_c1ab97666c8f9a2a6328a809b84\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`organization_clients\` DROP FOREIGN KEY \`FK_d265cc0f0cc9c88132ec78d1ea6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`countries_participation\` DROP FOREIGN KEY \`FK_514134ee7065393050569359bc5\``,
    );
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
    await queryRunner.query(
      `DROP INDEX \`unique_client_organizationId_type\` ON \`organization_clients\``,
    );
    await queryRunner.query(`DROP TABLE \`organization_clients\``);
    await queryRunner.query(
      `DROP INDEX \`unique_organizationId_country\` ON \`countries_participation\``,
    );
    await queryRunner.query(`DROP TABLE \`countries_participation\``);
  }
}
