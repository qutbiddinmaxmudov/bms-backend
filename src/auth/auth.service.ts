import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UserEntity } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ username, password }: LoginUserDto) {
    const { password: userPassword, ...user } =
      await this.userService.findOneByUsername(username);
    if (!user) {
      throw new HttpException('Incorrect username or password', 404);
    }
    const correctPassword = await compare(password, userPassword);
    if (!correctPassword) {
      throw new HttpException('Incorrect username or password', 404);
    }
    const access = await this.login(user);
    return { access, user };
  }

  async login(user: Omit<UserEntity, 'password'>) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
