import { ObjectType, Field, Int } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, } from "typeorm";

@ObjectType()
@Entity('users')
export class User extends BaseEntity{

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column("text")
    email: string;

    @Column("text")
    password: string;
    
    // this is a version column for refresh tokens
    @Column("int", {default: 0})
    tokenVersion: number;
}
