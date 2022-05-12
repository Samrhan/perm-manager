import {MigrationInterface, QueryRunner} from "typeorm";

export class addOrganisation1652372626992 implements MigrationInterface {
    name = 'addOrganisation1652372626992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organisation" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organisation" DROP COLUMN "name"`);
    }

}
