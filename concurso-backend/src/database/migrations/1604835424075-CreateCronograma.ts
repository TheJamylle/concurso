import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export default class CreateCronograma1604835424075 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'cronograma',
          columns: [
            {
              name: 'id_cronograma',
              type: 'integer',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment'
            },
            {
              name: 'item',
              type: 'varchar'
            },
            {
              name: 'data_inicio',
              type: 'date'
            },
            {
              name: 'data_fim',
              type: 'date'
            },
            {
              name: 'id_premio_fk',
              type: 'integer'
            }
          ]
        })
      );

      await queryRunner.createForeignKey(
        'cronograma',
        new TableForeignKey({
          columnNames: ['id_premio_fk'],
          referencedColumnNames: ['id_premio'],
          referencedTableName: 'premio',
          onDelete: 'CASCADE'
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('cronograma');
    }

}
