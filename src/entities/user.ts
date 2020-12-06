import {Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import Car from './car';


@Entity()
export default class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated('uuid')
    authId:string

    @Column()
    username:string;

    @Column()
    password:string;

    @OneToMany(()=>Car,car=>car.user)
    cars:Car[];

    constructor(id:number,authId:string,username:string,password:string,cars:Car[]) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.authId = authId;
        this.cars = cars;
    }

}