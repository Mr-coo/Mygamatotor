import { User } from '@prisma/client';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';

@ValidatorConstraint({ async: true })
export class IsUsernameUnique implements ValidatorConstraintInterface {
    constructor(private prisma: PrismaService) {}

    async validate(username: string) {
        const user = await this.prisma.user.findUnique({
            where: { username },
        });

        return !user;
    }

    defaultMessage() {
        return 'Username already exists';
    }
}