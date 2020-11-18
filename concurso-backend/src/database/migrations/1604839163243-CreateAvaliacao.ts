import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateAvaliacao1604839163243 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'avaliacao',
          columns: [
            {
              name: 'id_avaliacao',
              type: 'integer',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment'
            },
            {
              name: 'parecer',
              type: 'text'
            },
            {
              name: 'nota',
              type: 'float'
            },
            {
              name: 'data_avaliacao',
              type: 'date'
            },
            {
              name: 'id_avaliador_fk',
              type: 'integer'
            },
            {
              name: 'id_projeto_fk',
              type: 'integer'
            }
          ]
        })
      );

      await queryRunner.createForeignKey(
        'avaliacao',
        new TableForeignKey({
          columnNames: ['id_avaliador_fk'],
          referencedTableName: 'avaliador',
          referencedColumnNames: ['id_avaliador']
        })
      );

      await queryRunner.createForeignKey(
        'avaliacao',
        new TableForeignKey({
          columnNames: ['id_projeto_fk'],
          referencedTableName: 'projeto',
          referencedColumnNames: ['id_projeto']
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('avaliacao');
    }

}
