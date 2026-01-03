import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { IsUsernameUnique } from './validator/is-username-unique.validator';
import { ConfirmEqualPassword } from './validator/confirm-equal-password.validator';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, IsUsernameUnique, ConfirmEqualPassword],
  exports: [UserService]
})
export class UserModule {}
