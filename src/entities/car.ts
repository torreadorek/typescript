import {Column,Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import User from './user';

@Entity()
export default class Car {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    make:string;

    @Column()
    model:string;

    @ManyToOne(()=>User,user=>user.cars)
    user:User;

    constructor(id:number,make:string,model:string,user:User) {
        this.id = id;
        this.make = make;
        this.model = model;
        this.user = user;
    }
}