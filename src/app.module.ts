import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/entities/user.entity";
import { UsersModule } from "./users/users.module";
import { RoomsModule } from "./rooms/rooms.module";
import { Room } from "./rooms/entities/room.entity";
import { MessagesModule } from "./messages/messages.module";
import { Message } from "./messages/entities/message.entity";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: "postgres",
        host: process.env.DATABASE_HOST || "localhost",
        port: parseInt(process.env.DATABASE_PORT) || 5432,
        username: process.env.DATABASE_USERNAME || "postgres",
        password: process.env.DATABASE_PASSWORD || "postgres",
        database: process.env.DATABASE_SCHEMA || "chatdb",
        entities: [User, Room, Message],
        synchronize: true,
      }),
    }),
    UsersModule,
    RoomsModule,
    MessagesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
