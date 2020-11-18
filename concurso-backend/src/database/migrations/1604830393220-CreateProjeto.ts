import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export default class CreateProjeto1604830393220 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'projeto',
          columns: [
            {
              name: 'id_projeto',
              type: 'integer',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment'
            },
            {
              name: 'titulo',
              type: 'varchar',
              length: '50'
            },
            {
              name: 'resumo',
              type: 'text'
            },
            {
              name: 'data_envio',
              type: 'date'
            },
            {
              name: 'id_area_fk',
              type: 'integer'
            },
            {
              name: 'id_premio_fk',
              type: 'integer',
              isNullable: true
            }
          ]
        })
      );

      await queryRunner.createForeignKey(
        'projeto',
        new TableForeignKey({
          columnNames: ['id_area_fk'],
          referencedTableName: 'area',
          referencedColumnNames: ['id_area'],
          onDelete: 'RESTRICT'
        })
      );

      await queryRunner.createForeignKey(
        'projeto',
        new TableForeignKey({
          columnNames: ['id_premio_fk'],
          referencedColumnNames: ['id_premio'],
          referencedTableName: 'premio',
          onDelete: 'SET NULL'
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('projeto');
    }

}
