import {MigrationInterface, QueryRunner} from "typeorm";

export class updatecycleDateType1657982157115 implements MigrationInterface {
    name = 'updatecycleDateType1657982157115'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cycle" DROP COLUMN "start"`);
        await queryRunner.query(`ALTER TABLE "cycle" ADD "start" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cycle" DROP COLUMN "end"`);
        await queryRunner.query(`ALTER TABLE "cycle" ADD "end" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cycle" DROP COLUMN "end"`);
        await queryRunner.query(`ALTER TABLE "cycle" ADD "end" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cycle" DROP COLUMN "start"`);
        await queryRunner.query(`ALTER TABLE "cycle" ADD "start" TIMESTAMP NOT NULL`);
    }

}
