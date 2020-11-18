import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export default class CreateCandidato1604830393224 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'candidato',
          columns: [
            {
              name: 'id_candidato',
              type: 'integer',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment'
            },
            {
              name: 'numero_inscricao',
              type: 'integer'
            },
            {
              name: 'id_pessoa_fk',
              type: 'integer'
            },
            {
              name: 'id_projeto_fk',
              type: 'integer',
              isNullable: true
            }
          ]
        })
      );

      await queryRunner.createForeignKey(
        'candidato',
        new TableForeignKey({
          columnNames: ['id_pessoa_fk'],
          referencedTableName: 'pessoa',
          referencedColumnNames: ['id_pessoa'],
          onDelete: 'RESTRICT'
        })
      );

      await queryRunner.createForeignKey(
        'candidato',
        new TableForeignKey({
          columnNames: ['id_projeto_fk'],
          referencedTableName: 'projeto',
          referencedColumnNames: ['id_projeto'],
          onDelete: 'RESTRICT'
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('candidato');
    }

}
