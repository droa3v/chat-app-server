import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, Length } from "class-validator";

@InputType()
export class CreateUserInput {
  @Field({ nullable: true })
  firstName?: string;
  @Field({ nullable: true })
  lastName?: string;
  @Length(2, 20)
  @Field()
  username: string;
  @IsEmail()
  @Field()
  email: string;
  @Length(8, 32)
  @Field({ nullable: true })
  password?: string;
}
