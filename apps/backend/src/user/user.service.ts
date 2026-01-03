import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashed = await bcrypt.hash(createUserDto.password, 16);
    const data = {
      username: createUserDto.username,
      password: hashed,
    };

    return this.prisma.user.create({ data: data });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          username: updateUserDto.username,
        },
      });
    } catch (error) {
      if(error.code == 'P2025') throw new NotFoundException();
      return error;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.user.delete({
        where: {
          id: id,
        }
      })
    } catch (error) {
      console.log(error);
      if(error.code == 'P2025') throw new NotFoundException();
      return error;
    }
  }
}
