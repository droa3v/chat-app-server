import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare, hash } from "bcrypt";
import { CreateUserInput } from "src/users/dto/create-user.input";
import { SignInUserInput } from "src/users/dto/sign-in.input";
import { UsersService } from "src/users/users.service";
import { JwtDto } from "./dto/jwt.dto";
import { UserToken } from "./dto/user-token.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  signToken(id: string, email: string) {
    const payload: JwtDto = { sub: id, email };
    return this.jwtService.sign(payload);
  }

  async signIn(signInUserInput: SignInUserInput): Promise<UserToken> {
    const user = await this.usersService.findUserByEmail({
      email: signInUserInput.email,
    });

    if (!user) {
      throw new NotFoundException("User with this email doesn't exist");
    }

    const validatedPassword = await compare(
      signInUserInput.password,
      user.password,
    );

    if (!validatedPassword) {
      throw new Error("Invalid password");
    }

    return {
      user: user,
      token: this.signToken(user._id, user.email),
    };
  }

  async signUp(signUpUserInput: CreateUserInput): Promise<UserToken> {
    const user = await this.usersService.findUserByEmail({
      email: signUpUserInput.email,
    });
    if (user) {
      throw new BadRequestException("This email in already in use");
    }

    const password = await hash(signUpUserInput.password, 10);
    const createdUser = await this.usersService.create({
      ...signUpUserInput,
      password,
    });

    return {
      user: createdUser,
      token: this.signToken(createdUser._id, createdUser.email),
    };
  }
}
