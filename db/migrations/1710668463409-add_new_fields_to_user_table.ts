import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewFieldsToUserTable1710668463409
  implements MigrationInterface
{
  name = 'AddNewFieldsToUserTable1710668463409';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`refresh_token\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP COLUMN \`refresh_token\``,
    );
  }
}
