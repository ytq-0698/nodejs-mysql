import { Injectable } from '@nestjs/common';
import { User } from '../types/user';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    public readonly userRepository: Repository<UserEntity>,
  ) {}

  async findByUsername(username: string): Promise<User | undefined> {
    const users: User[] = await this.userRepository.find({
      select: {
        username: true,
        password: true,
        userId: true,
      },
    });
    return users.find((user) => user.username === username);
  }
}
