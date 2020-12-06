import {getRepository, MigrationInterface, QueryRunner} from "typeorm";

export class SeedCars1607291354298 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await getRepository('Car').save([{
            make:'Subaru',
            model:'Impreza',
            userId: getRepository('User').create({userId:20})
        },
        { 
            make:'Toyota',
            model:'Supra',
            userId:20 
        }])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
