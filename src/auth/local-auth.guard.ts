import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';

@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.body;
    const findUser = await this.userService.findByUsername(user.username);
    if (!findUser) {
      throw new HttpException('User is not exist', HttpStatus.UNAUTHORIZED);
    }
    const hasPass = bcrypt.compareSync(user.password, findUser.password);
    if (!hasPass) {
      throw new HttpException(
        'Password is not correct',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return true;
  }
}
