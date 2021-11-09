import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import {Fund} from "./Fund";
import { Id } from '../types/index';

@Entity({name: 'user'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', {length: 225})
    name: string;

    @Column('varchar', {length: 225})
    login: string;

    @Column()
    password: string;

    @OneToMany<Fund>(() => Fund, (fund: Fund): Id => fund.userId as Id, { cascade: true })
    funds: Fund[];

    static toResponse(user?: Partial<User>): Partial<User> | undefined {
        if (!user) return undefined;
        const { id, name, login } = user;
        return { id, name, login };
    }
}
