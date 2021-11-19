import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User, { name: "createUser" })
  create(@Args("createUserInput") createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: "getAllUsers" })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: "getUserById" })
  findOne(@Args("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User, { name: "updateUser" })
  update(
    @Args("id") id: string,
    @Args("updateUserInput") updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => User, { name: "deleteUser" })
  remove(@Args("id") id: string) {
    return this.usersService.remove(id);
  }
}
