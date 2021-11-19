import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  create(createUserInput: CreateUserInput) {
    return this.usersRepository.save(createUserInput);
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException("This user doesn't exist");
    }

    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException("This user doesn't exist");
    }

    return this.usersRepository.update(id, { ...updateUserInput });
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException("This user doesn't exist");
    }

    return this.usersRepository.delete(id);
  }
}
