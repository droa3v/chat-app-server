import { forwardRef, Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";
import { UsersModule } from "src/users/users.module";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { JwtModule } from "@nestjs/jwt";
import { RolesGuard } from "./guards/roles.guard";

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      secret: "test",
      signOptions: { expiresIn: "30d" },
    }),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy, RolesGuard],
})
export class AuthModule {}
