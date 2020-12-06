import {getRepository,MigrationInterface, QueryRunner} from "typeorm";

export class SeedUser1607268553601 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await getRepository('User').save([{
            username:'testuser',
            password:'testpassword'
        },
        {
            username:'testuser1',
            password:'testpassword1'
        },
        {
            username:'testuser2',
            password:'testuser2'
        }])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
