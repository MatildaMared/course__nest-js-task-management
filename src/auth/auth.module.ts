import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UsersRepository } from "./users.repository";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: "jwt" }),
        JwtModule.register({
            secret: "molnRullstol392",
            signOptions: {
                expiresIn: 3600,
            },
        }),
        TypeOrmModule.forFeature([User]),
    ],
    providers: [AuthService, UsersRepository],
    controllers: [AuthController],
})
export class AuthModule {}
