import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/users.entity';
import { genSalt, hash } from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async create(userDto: CreateUserDto) {
    const userExists = await this.findOneByUsername(userDto.username);
    if (userExists) {
      throw new HttpException('This username already taken', 400);
    }
    const salt = await genSalt();
    const psdHash = await hash(userDto.password, salt);

    return this.repository.insert({
      ...userDto,
      password: psdHash,
      finishDate: null,
    });
  }

  findAll() {
    return this.repository.findBy({});
  }

  findActiveUsers() {
    return this.repository.findBy({ isActive: true });
  }

  findOneByUsername(username: string) {
    return this.repository.findOneBy({
      username,
    });
  }

  findById(id: number) {
    return this.repository.findOneBy({ id });
  }

  async disable(id: number) {
    const user = await this.findById(id);
    if (!user) {
      throw new HttpException('User not found.', 404);
    }
    if (!user.isActive) {
      throw new HttpException('User already disabled!', 400);
    }
    return this.repository.update(
      {
        id,
      },
      {
        isActive: false,
      },
    );
  }

  async activate(id: number) {
    const user = await this.findById(id);
    if (!user) {
      throw new HttpException('User not found.', 404);
    }
    if (user.isActive) {
      throw new HttpException('User already active!', 400);
    }
    return this.repository.update(
      {
        id,
      },
      {
        isActive: true,
      },
    );
  }

  async update(id: number, userDto: UpdateUserDto) {
    return this.repository.update(
      {
        id,
      },
      userDto,
    );
  }
}
