import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { MessagesService } from "./messages.service";
import { Message } from "./entities/message.entity";
import { CreateMessageInput } from "./dto/create-message.input";
import { UpdateMessageInput } from "./dto/update-message.input";

@Resolver(() => Message)
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService) {}

  @Mutation(() => Message, { name: "createMessage" })
  create(@Args("createMessageInput") createMessageInput: CreateMessageInput) {
    return this.messagesService.create(createMessageInput);
  }

  @Query(() => [Message], { name: "getAllMessages" })
  findAll() {
    return this.messagesService.findAll();
  }

  @Query(() => Message, { name: "getMessageById" })
  findOne(@Args("id") id: string) {
    return this.messagesService.findOne(id);
  }

  @Mutation(() => Message, { name: "updateMessage" })
  update(
    @Args("id") id: string,
    @Args("updateMessageInput") updateMessageInput: UpdateMessageInput,
  ) {
    return this.messagesService.update(id, updateMessageInput);
  }

  @Mutation(() => Message, { name: "deleteMessage" })
  remove(@Args("id") id: string) {
    return this.messagesService.remove(id);
  }
}
