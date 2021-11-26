import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, Length } from "class-validator";

@InputType()
export class SignInUserInput {
  @IsEmail()
  @Field()
  email?: string;
  @Length(8, 32)
  @Field()
  password?: string;
}
