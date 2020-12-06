import {Column, Entity, Generated, PrimaryGeneratedColumn} from 'typeorm';


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

    constructor(id:number,authId:string,username:string,password:string) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.authId = authId;
    }

}