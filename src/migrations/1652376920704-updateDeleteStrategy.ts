import {MigrationInterface, QueryRunner} from "typeorm";

export class updateDeleteStrategy1652376920704 implements MigrationInterface {
    name = 'updateDeleteStrategy1652376920704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "day" DROP CONSTRAINT "FK_76fe96a731590e11d28aeed7b75"`);
        await queryRunner.query(`ALTER TABLE "day" ADD CONSTRAINT "FK_76fe96a731590e11d28aeed7b75" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "day" DROP CONSTRAINT "FK_76fe96a731590e11d28aeed7b75"`);
        await queryRunner.query(`ALTER TABLE "day" ADD CONSTRAINT "FK_76fe96a731590e11d28aeed7b75" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
