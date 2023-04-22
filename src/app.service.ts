import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  constructor(private userService: UsersService) {}
  getHello(): string {
    return 'Hello World!!!';
  }

  async getProfile(username: string) {
    const { password, ...user } = await this.userService.findOneByUsername(
      username,
    );
    return user;
  }
}
