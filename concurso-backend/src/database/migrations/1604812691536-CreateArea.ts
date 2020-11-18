import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateArea1604812691536 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'area',
          columns: [
            {
              name: 'id_area',
              type: 'integer',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment'
            },
            {
              name: 'descricao',
              type: 'varchar'
            }
          ]
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('area');
    }

}
