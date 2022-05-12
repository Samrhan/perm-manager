import {MigrationInterface, QueryRunner} from "typeorm";

export class updateDefaultValue1652372902399 implements MigrationInterface {
    name = 'updateDefaultValue1652372902399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "priority" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "priority" DROP DEFAULT`);
    }

}
