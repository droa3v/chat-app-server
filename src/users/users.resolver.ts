import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { UpdateUserInput } from "./dto/update-user.input";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { ReqUser } from "src/auth/decorators/user.decorator";

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: "getAllUsers" })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: "getUserById" })
  findOne(@Args("id") id: string) {
    return this.usersService.findUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => User, { name: "updateUser" })
  update(
    @ReqUser() user: User,
    @Args("updateUserInput") updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(user._id, updateUserInput);
  }

  @Mutation(() => User, { name: "deleteUser" })
  remove(@Args("id") id: string) {
    return this.usersService.remove(id);
  }
}
