import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty, Length } from "class-validator";

@InputType()
export class CreateMessageInput {
  @Length(1, 240)
  @Field()
  body: string;
  @IsNotEmpty()
  @Field()
  creatorId: string;
  @Field({ nullable: true })
  recipientId?: string;
  @Field({ nullable: true })
  roomId?: string;
}
