import { Controller, Post, Request, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('create')
  async create(@Request() req) {
    return this.authService.create(req.body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @Post('logout')
  async logout(@Request() req) {
    await this.authService.logout(req.token);
    return { message: 'Logout successful' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('checkin')
  async checkIn(@Request() req): Promise<string> {
    return this.authService.checkIn(req.user_data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('checkout')
  async checkOut(@Request() req): Promise<string> {
    return this.authService.checkOut(req.user_data);
  }
}
