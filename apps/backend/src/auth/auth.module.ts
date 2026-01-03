import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategtService } from './jwt-strategy.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { OwnershipGuard } from './ownership.guard';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
  PassportModule,
  JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1h' },
  }),
  UserModule
],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategtService],
})
export class AuthModule {}
