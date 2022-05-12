import {MigrationInterface, QueryRunner} from "typeorm";

export class updatePrimaryKeyDay1652377481805 implements MigrationInterface {
    name = 'updatePrimaryKeyDay1652377481805'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "day" DROP CONSTRAINT "PK_42e726f6b72349f70b25598b50e"`);
        await queryRunner.query(`ALTER TABLE "day" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "day" ADD CONSTRAINT "PK_a4f64a346d08ab59592c41557bf" PRIMARY KEY ("user_id", "date")`);
        await queryRunner.query(`ALTER TABLE "day" DROP CONSTRAINT "FK_76fe96a731590e11d28aeed7b75"`);
        await queryRunner.query(`ALTER TABLE "day" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "day" ADD CONSTRAINT "FK_76fe96a731590e11d28aeed7b75" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "day" DROP CONSTRAINT "FK_76fe96a731590e11d28aeed7b75"`);
        await queryRunner.query(`ALTER TABLE "day" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "day" ADD CONSTRAINT "FK_76fe96a731590e11d28aeed7b75" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "day" DROP CONSTRAINT "PK_a4f64a346d08ab59592c41557bf"`);
        await queryRunner.query(`ALTER TABLE "day" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "day" ADD CONSTRAINT "PK_42e726f6b72349f70b25598b50e" PRIMARY KEY ("id")`);
    }

}
