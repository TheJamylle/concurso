import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreatePessoa1604829572024 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'pessoa',
          columns: [
            {
              name: 'id_pessoa',
              type: 'integer',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment'
            },
            {
              name: 'nome',
              type: 'varchar',
            },
            {
              name: 'cpf',
              type: 'varchar',
              length: '20'
            },
            {
              name: 'data_nascimento',
              type: 'date'
            },
            {
              name: 'endereco',
              type: 'json'
            }
          ]
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('pessoa');
    }

}
