import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDataEntity } from './user-data.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserDataService {
  constructor(
    @InjectRepository(UserDataEntity)
    public readonly userDataRepository: Repository<UserDataEntity>,
  ) {}
}
