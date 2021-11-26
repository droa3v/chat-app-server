import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, Length } from "class-validator";
import { UniqueOnDatabase } from "src/auth/validations/unique.validation";
import { User } from "../entities/user.entity";

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
  @UniqueOnDatabase(User, {
    message: "This email is already in use",
  })
  email: string;
  @Length(8, 32)
  @Field()
  password: string;
}
