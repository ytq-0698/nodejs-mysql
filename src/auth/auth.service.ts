import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { UserDataService } from '../user/user-data.service';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class AuthService {
  private readonly blacklist: string[] = [];
  constructor(
    private userService: UserService,
    private userDataService: UserDataService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    return this.blacklist.includes(token);
  }

  async verifyToken(token: string): Promise<any> {
    try {
      const isBlacklisted = await this.isTokenBlacklisted(token);
      if (isBlacklisted) {
        throw new Error('Token is blacklisted');
      }

      const payload = this.jwtService.verify(token);
      return payload;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  async hashPassword(password: string): Promise<string> {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async login(user: UserDto) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        secret: 'xxx',
        expiresIn: '1d',
      }),
    };
  }

  async logout(token: string) {
    this.blacklist.push(token);
  }

  async create(user: UserDto) {
    const payload = { username: user.username, sub: user.userId };
    const password = await this.hashPassword(user.password);
    const savedUser = await this.userService.userRepository.save({
      ...user,
      password,
      refresh_token: this.jwtService.sign(payload, {
        secret: 'xxx',
        expiresIn: '1d',
      }),
    });
    return plainToInstance(UserDto, savedUser);
  }

  async checkIn(user_data): Promise<string> {
    const currentTime = new Date().toISOString();
    const newData = {
      username: user_data.username,
      userId: user_data.sub,
      checkin: currentTime,
      checkout: '',
    };
    await this.userDataService.userDataRepository.save(newData);
    return `Checked in at: ${currentTime}`;
  }

  async checkOut(user_data): Promise<string> {
    const currentTime = new Date().toISOString();
    await this.userDataService.userDataRepository.update(
      {
        userId: user_data.sub,
      },
      { checkout: currentTime },
    );
    return `Checked out at: ${currentTime}`;
  }
}
