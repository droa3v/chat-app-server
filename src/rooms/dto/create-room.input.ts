import { InputType, Field } from "@nestjs/graphql";
import { IsOptional, Length } from "class-validator";

@InputType()
export class CreateRoomInput {
  @Length(1, 120)
  @Field()
  title: string;
  @IsOptional()
  @Length(1, 240)
  @Field({ nullable: true })
  description?: string;
  @Field({ nullable: true })
  public?: boolean;
}
