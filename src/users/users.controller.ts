import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {

  constructor(private readonly userService: UsersService){}

  @Get() //GET /users or /users?role=admin
  findAll(@Query('role') role?: UserRole) {
    return this.userService.findAll(role);
  }

  @Get(':id') //GET /users/:id
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Post() //POST /users
  create(@Body() user: Omit<User,'id'>) {
    return this.userService.create(user);
  }

  @Patch(':id') //PATCH /users/:id
  update(@Param('id') id: string, @Body() userUpdate: Omit<Partial<User>,'id'>) {
    return this.userService.update(+id,userUpdate);
  }

  @Delete(':id') //DELETE /users/:id
  delete(@Param('id') id: string) {
    return this.userService.delete(+id);
  }
}
