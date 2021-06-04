import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class profiles1622567248957 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'profiles',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid'
          },
          {
            name: 'type',
            type: 'varchar',
            isNullable: false,
            isUnique: true
          },
          {
            name: 'label',
            type: 'varchar',
            isNullable: false
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('profiles');
  }

}
