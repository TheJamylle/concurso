import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateAvaliador1604830369911 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'avaliador',
          columns: [
            {
              name: 'id_avaliador',
              type: 'integer',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment'
            },
            {
              name: 'registro',
              type: 'varchar'
            },
            {
              name: 'id_pessoa_fk',
              type: 'integer'
            }
          ]
        }
       )
      );

      await queryRunner.createForeignKey(
        'avaliador',
        new TableForeignKey({
          columnNames: ['id_pessoa_fk'],
          referencedColumnNames: ['id_pessoa'],
          referencedTableName: 'pessoa',
          onDelete: 'RESTRICT'
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('avaliador');
    }

}
