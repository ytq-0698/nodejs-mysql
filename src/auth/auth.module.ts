import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { UserDataEntity } from 'src/user/user-data.entity';
import { UserDataService } from 'src/user/user-data.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: 'xxx',
      signOptions: {
        expiresIn: '1h',
      },
    }),
    TypeOrmModule.forFeature([UserEntity, UserDataEntity]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    UserDataService,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
