import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { RoomsService } from "./rooms.service";
import { Room } from "./entities/room.entity";
import { CreateRoomInput } from "./dto/create-room.input";
import { UpdateRoomInput } from "./dto/update-room.input";

@Resolver(() => Room)
export class RoomsResolver {
  constructor(private readonly roomsService: RoomsService) {}

  @Mutation(() => Room, { name: "createRoom" })
  create(@Args("createRoomInput") createRoomInput: CreateRoomInput) {
    return this.roomsService.create(createRoomInput);
  }

  @Query(() => [Room], { name: "getAllRooms" })
  findAll() {
    return this.roomsService.findAll();
  }

  @Query(() => Room, { name: "getRoomById" })
  findOne(@Args("id") id: string) {
    return this.roomsService.findOne(id);
  }

  @Mutation(() => Room, { name: "updateRoom" })
  updateRoom(
    @Args("id") id: string,
    @Args("updateRoomInput") updateRoomInput: UpdateRoomInput,
  ) {
    return this.roomsService.update(id, updateRoomInput);
  }

  @Mutation(() => Room, { name: "deleteRoom" })
  removeRoom(@Args("id") id: string) {
    return this.roomsService.remove(id);
  }

  @Mutation(() => Room, { name: "addUserToRoom" })
  addUser(@Args("userId") userId: string, @Args("roomId") roomId: string) {
    return this.roomsService.addUser(userId, roomId);
  }

  @Mutation(() => Room, { name: "removeUserFromRoom" })
  removeUser(@Args("userId") userId: string, @Args("roomId") roomId: string) {
    return this.roomsService.removeUser(userId, roomId);
  }
}
