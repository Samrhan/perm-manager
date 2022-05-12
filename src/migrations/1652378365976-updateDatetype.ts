import {MigrationInterface, QueryRunner} from "typeorm";

export class updateDatetype1652378365976 implements MigrationInterface {
    name = 'updateDatetype1652378365976'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "day" DROP CONSTRAINT "PK_a4f64a346d08ab59592c41557bf"`);
        await queryRunner.query(`ALTER TABLE "day" ADD CONSTRAINT "PK_76fe96a731590e11d28aeed7b75" PRIMARY KEY ("user_id")`);
        await queryRunner.query(`ALTER TABLE "day" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "day" ADD "date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "day" DROP CONSTRAINT "PK_76fe96a731590e11d28aeed7b75"`);
        await queryRunner.query(`ALTER TABLE "day" ADD CONSTRAINT "PK_a4f64a346d08ab59592c41557bf" PRIMARY KEY ("user_id", "date")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "day" DROP CONSTRAINT "PK_a4f64a346d08ab59592c41557bf"`);
        await queryRunner.query(`ALTER TABLE "day" ADD CONSTRAINT "PK_76fe96a731590e11d28aeed7b75" PRIMARY KEY ("user_id")`);
        await queryRunner.query(`ALTER TABLE "day" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "day" ADD "date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "day" DROP CONSTRAINT "PK_76fe96a731590e11d28aeed7b75"`);
        await queryRunner.query(`ALTER TABLE "day" ADD CONSTRAINT "PK_a4f64a346d08ab59592c41557bf" PRIMARY KEY ("date", "user_id")`);
    }

}
