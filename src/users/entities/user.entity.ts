import { ObjectType, Field } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "Users" })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;
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
  @Field()
  password: string;
  @CreateDateColumn()
  @Field()
  created_at: Date;
  @UpdateDateColumn()
  @Field()
  updated_at: Date;
}
