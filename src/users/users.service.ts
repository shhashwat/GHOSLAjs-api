import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'John Doe', email: '5Eo5Q@example.com', role: 'ADMIN' },
    { id: 2, name: 'Jane Smith', email: '6Eo6Q@example.com', role: 'ENGINEER' },
    {
      id: 3,
      name: 'Alice Johnson',
      email: '7Eo7Q@example.com',
      role: 'INTERN',
    },
    { id: 4, name: 'Bob Brown', email: '4Eo4Q@example.com', role: 'ADMIN' },
    {
      id: 5,
      name: 'Charlie White',
      email: '3Eo3Q@example.com',
      role: 'ENGINEER',
    },
    { id: 6, name: 'Diana Green', email: '2Eo2Q@example.com', role: 'INTERN' },
  ];

  findAll(role?: UserRole): User[] {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }

  create(createUserDto: CreateUserDto): User {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };

    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto): User {
    this.users = this.users.map(user => {
        if(user.id === id) return {...user, ...updateUserDto}

        return user;
    })

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter(user => user.id !== id);

    return removedUser;
  }
}
