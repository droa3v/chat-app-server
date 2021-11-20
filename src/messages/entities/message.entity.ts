import { ObjectType, Field } from "@nestjs/graphql";
import { User } from "src/users/entities/user.entity";
import { Room } from "src/rooms/entities/room.entity";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";

@Entity({ name: "Messages" })
@ObjectType()
export class Message {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;
  @Column()
  @Field()
  body: string;
  @ManyToOne(() => User)
  @Field(() => User)
  creator: User;
  // @Column()
  // @Field()
  // creatorId: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @ManyToOne(() => User, { nullable: true })
  @Field(() => User, { nullable: true })
  recipient?: User;
  // @Column({ nullable: true })
  // @Field({ nullable: true })
  // recipientId?: string;
  @ManyToOne(() => Room, { nullable: true })
  @Field(() => Room, { nullable: true })
  room?: Room;
  // @Column({ nullable: true })
  // @Field({ nullable: true })
  // roomId?: string;
}
