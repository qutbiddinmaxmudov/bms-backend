import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/users.entity';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async create({ username, password }: CreateUserDto) {
    const salt = await genSalt();
    const psdHash = await hash(password, salt);

    return this.repository.insert({
      username,
      password: psdHash,
      finishDate: null,
    });
  }

  findAll() {
    return this.repository.findBy({});
  }

  findOneByUsername(username: string) {
    return this.repository.findOneBy({
      username,
    });
  }

  findById(id: number) {
    return this.repository.findOneBy({ id });
  }
}
