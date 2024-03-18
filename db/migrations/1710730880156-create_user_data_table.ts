import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserDataTable1710730880156 implements MigrationInterface {
  name = 'CreateUserDataTable1710730880156';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user_data\` (\`userId\` int NOT NULL, \`username\` varchar(255) NOT NULL, \`checkin\` varchar(255) NOT NULL, \`checkout\` varchar(255) NOT NULL, PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`user_data\``);
  }
}
