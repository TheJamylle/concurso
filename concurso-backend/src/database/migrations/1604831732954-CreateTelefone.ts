import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTelefone1604831732954 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'telefone',
          columns: [
            {
              name: 'id_telefone',
              type: 'integer',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment'
            },
            {
              name: 'ddd',
              type: 'integer',
            },
            {
              name: 'numero',
              type: 'integer',
            },
            {
              name: 'tipo',
              type: 'enum',
              enum: ['pessoal', 'residencial', 'comercial']
            },
            {
              name: 'id_pessoa_fk',
              type: 'integer',
              isNullable: true
            }
          ]
        })
      );

      await queryRunner.createForeignKey(
        'telefone',
        new TableForeignKey({
          columnNames: ['id_pessoa_fk'],
          referencedColumnNames: ['id_pessoa'],
          referencedTableName: 'pessoa',
          onDelete: 'SET NULL'
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('telefone');
    }

}
