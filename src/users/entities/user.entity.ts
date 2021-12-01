import { ObjectType, Field } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Role } from "../dto/role.enum";

@Entity({ name: "Users" })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  _id: string;
  @Column({ nullable: true })
  @Field({ nullable: true })
  firstName?: string;
  @Column({ nullable: true })
  @Field({ nullable: true })
  lastName?: string;
  @Column()
  @Field()
  username: string;
  @Column({ unique: true })
  @Field()
  email: string;
  @Column()
  password: string;
  @CreateDateColumn()
  @Field()
  created_at: Date;
  @UpdateDateColumn()
  @Field()
  updated_at: Date;
  @Column({ type: "enum", enum: Role, default: Role.USER })
  @Field()
  role: Role;
  @Column({ type: "date", nullable: true })
  @Field()
  birthday: string;
}
