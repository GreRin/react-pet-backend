import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
// import { Id } from '../types/index';
// import { Task } from './Task';

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

    // @OneToMany<Task>(() => Task, (task: Task): Id => task.userId as Id, { cascade: true })
    // tasks: Task[];

    static toResponse(user?: Partial<User>): Partial<User> | undefined {
        if (!user) return undefined;
        const { id, name, login } = user;
        return { id, name, login };
    }
}
