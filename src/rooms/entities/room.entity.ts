import { ObjectType, Field } from "@nestjs/graphql";
import { User } from "src/users/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";

@Entity({ name: "Rooms" })
@ObjectType()
export class Room {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;
  @Column({ nullable: false })
  @Field({ nullable: false })
  title: string;
  @Column({ nullable: true })
  @Field({ nullable: true })
  description?: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @Column({ default: true })
  @Field()
  public: boolean;
  @ManyToMany(() => User)
  @JoinTable({
    joinColumn: { name: "room_id" },
    inverseJoinColumn: { name: "user_id" },
  })
  @Field(() => [User])
  users: User[];
}
