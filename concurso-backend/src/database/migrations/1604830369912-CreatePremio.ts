import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreatePremio1604830369912 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'premio',
          columns: [
            {
              name: 'id_premio',
              type: 'integer',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment'
            },
            {
              name: 'nome',
              type: 'varchar',
              length: '50'
            },
            {
              name: 'descricao',
              type: 'varchar'
            },
            {
              name: 'ano',
              type: 'integer'
            },
            {
              name: 'id_area_fk',
              type: 'integer'
            }
          ]
        })
      );

      await queryRunner.createForeignKey(
        'premio',
        new TableForeignKey({
          columnNames: ['id_area_fk'],
          referencedTableName: 'area',
          referencedColumnNames: ['id_area']
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('premio');
    }

}
