import { Controller, Get, Post, Body, Param, Patch, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('active')
  findActives() {
    return this.usersService.findActiveUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(+id);
  }

  @Put(':id')
  editUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(+id, dto);
  }

  @Patch('disable/:id')
  disable(@Param('id') id: string) {
    return this.usersService.disable(+id);
  }

  @Patch('activate/:id')
  activate(@Param('id') id: string) {
    return this.usersService.activate(+id);
  }
}
