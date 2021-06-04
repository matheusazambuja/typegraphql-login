import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class usersProfiles1622567258506 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users_profiles',
        columns: [
          {
            name: 'user_id',
            type: 'varchar',
            isPrimary: true
          },
          {
            name: 'profile_id',
            type: 'varchar',
            isPrimary: true
          }
        ]
      })
    );

    await queryRunner.createForeignKey(
      'users_profiles',
      new TableForeignKey({
        name: 'FKUser',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['user_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    );

    await queryRunner.createForeignKey(
      'users_profiles',
      new TableForeignKey({
        name: 'FKProfile',
        referencedTableName: 'profiles',
        referencedColumnNames: ['id'],
        columnNames: ['profile_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users_profiles');
  }

}
