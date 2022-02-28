import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
} from "typeorm";
import { Fund } from "./Fund";
import { Id } from "../types/index";

const bcrypt = require("bcrypt");

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar", { length: 225, default: "" })
  name: string;

  @Column("varchar", { length: 225, unique: true })
  login!: string;

  @Column("varchar")
  password!: string;

  @OneToMany<Fund>(() => Fund, (fund: Fund): Id => fund.userId as Id, {
    cascade: true,
  })
  funds: Fund[];

  @BeforeInsert()
  generatePasswordHash() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  static toResponse(user?: Partial<User>): Partial<User> | undefined {
    if (!user) return undefined;
    const { id, name, login } = user;
    return { id, name, login };
  }
}
