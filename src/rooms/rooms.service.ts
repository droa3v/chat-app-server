import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";
import { CreateRoomInput } from "./dto/create-room.input";
import { UpdateRoomInput } from "./dto/update-room.input";
import { Room } from "./entities/room.entity";

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
  ) {}

  create(createRoomInput: CreateRoomInput) {
    return this.roomsRepository.save(createRoomInput);
  }

  findAll() {
    return this.roomsRepository.find({ relations: ["users"] });
  }

  async findOne(id: string) {
    const room = await this.roomsRepository.findOne(id, {
      relations: ["users"],
    });

    if (!room) {
      throw new NotFoundException("This room doesn't exist");
    }

    return room;
  }

  async update(id: string, updateRoomInput: UpdateRoomInput) {
    const room = await this.roomsRepository.findOne(id);

    if (!room) {
      throw new NotFoundException("This room doesn't exist");
    }

    return this.roomsRepository.update(id, { ...updateRoomInput });
  }

  async remove(id: string) {
    const room = await this.roomsRepository.findOne(id);

    if (!room) {
      throw new NotFoundException("This room doesn't exist");
    }

    return this.roomsRepository.delete(id);
  }

  async addUser(userId: string, roomId: string) {
    const room = await this.roomsRepository.findOne(roomId);

    if (!room) {
      throw new NotFoundException("This room doesn't exist");
    }

    const qb = this.roomsRepository.createQueryBuilder("addUserToRoom");
    qb.relation(Room, "users").of(room).add(userId);
  }

  async removeUser(userId: string, roomId: string) {
    const room = await this.roomsRepository.findOne(roomId);

    if (!room) {
      throw new NotFoundException("This room doesn't exist");
    }

    const qb = this.roomsRepository.createQueryBuilder("removeUserFromRoom");
    qb.relation(Room, "users").of(room).remove(userId);
  }
}
