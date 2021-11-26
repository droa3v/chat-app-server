import { Mutation, Resolver, Args } from "@nestjs/graphql";
import { CreateUserInput } from "src/users/dto/create-user.input";
import { SignInUserInput } from "src/users/dto/sign-in.input";
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";
import { UserToken } from "./dto/user-token.dto";

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => UserToken)
  async signIn(@Args("signInUserInput") signInUserInput: SignInUserInput) {
    return this.authService.signIn(signInUserInput);
  }

  @Mutation(() => UserToken)
  async signUp(@Args("signUpUserInput") signUpUserInput: CreateUserInput) {
    return this.authService.signUp(signUpUserInput);
  }
}
