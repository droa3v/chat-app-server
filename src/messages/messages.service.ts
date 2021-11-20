import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";
import { CreateMessageInput } from "./dto/create-message.input";
import { UpdateMessageInput } from "./dto/update-message.input";
import { Message } from "./entities/message.entity";

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  async create(createMessageInput: CreateMessageInput) {
    const message = await this.messagesRepository.save(createMessageInput);

    const qb = this.messagesRepository.createQueryBuilder("setRelations");
    qb.relation(Message, "creator")
      .of(message.id)
      .set(createMessageInput.creatorId);
    qb.relation(Message, "recipient")
      .of(message.id)
      .set(createMessageInput.recipientId);
    qb.relation(Message, "room").of(message.id).set(createMessageInput.roomId);

    return message;
  }

  findAll() {
    return this.messagesRepository.find({
      relations: ["creator", "recipient", "room"],
    });
  }

  async findOne(id: string) {
    const message = this.messagesRepository.findOne(id, {
      relations: ["creator", "recipient", "room"],
    });

    if (!message) {
      throw new NotFoundException("This message doesn't exist");
    }

    return message;
  }

  async update(id: string, updateMessageInput: UpdateMessageInput) {
    const message = this.messagesRepository.findOne(id);

    if (!message) {
      throw new NotFoundException("This message doesn't exist");
    }

    return this.messagesRepository.update(id, { ...updateMessageInput });
  }

  async remove(id: string) {
    const message = this.messagesRepository.findOne(id);

    if (!message) {
      throw new NotFoundException("This message doesn't exist");
    }

    return this.messagesRepository.delete(id);
  }
}
