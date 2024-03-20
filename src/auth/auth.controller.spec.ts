import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        JwtAuthGuard,
        JwtService,
        {
          provide: AuthService,
          useValue: {
            create: jest.fn(),
            login: jest.fn(),
            logout: jest.fn(),
            checkIn: jest.fn(),
            checkOut: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call authService.create and return its result', async () => {
      const userData = { username: 'testuser', password: 'password' };
      const expectedResult = { userId: 1, ...userData };
      jest.spyOn(authService, 'create').mockResolvedValueOnce(expectedResult);

      const result = await controller.create({ body: userData });

      expect(authService.create).toHaveBeenCalledWith(userData);
      expect(result).toBe(expectedResult);
    });
  });

  describe('login', () => {
    it('should call authService.login and return its result', async () => {
      const user = { username: 'testuser', password: 'password' };
      const expectedResult = { access_token: 'token' };
      jest.spyOn(authService, 'login').mockResolvedValueOnce(expectedResult);

      const result = await controller.login({ user });

      expect(authService.login).toHaveBeenCalledWith(user);
      expect(result).toBe(expectedResult);
    });
  });

  describe('logout', () => {
    it('should call authService.logout and return a message', async () => {
      const token = 'token';
      jest.spyOn(authService, 'logout').mockResolvedValueOnce();

      const result = await controller.logout({ token });

      expect(authService.logout).toHaveBeenCalledWith(token);
      expect(result).toEqual({ message: 'Logout successful' });
    });
  });

  describe('checkIn', () => {
    it('should call authService.checkIn and return its result', async () => {
      const userData = { id: 1, username: 'testuser' };
      const expectedResult = 'Checked in successfully';
      jest.spyOn(authService, 'checkIn').mockResolvedValueOnce(expectedResult);

      const result = await controller.checkIn({ user_data: userData });

      expect(authService.checkIn).toHaveBeenCalledWith(userData);
      expect(result).toBe(expectedResult);
    });
  });

  describe('checkOut', () => {
    it('should call authService.checkOut and return its result', async () => {
      const userData = { id: 1, username: 'testuser' };
      const expectedResult = 'Checked out successfully';
      jest.spyOn(authService, 'checkOut').mockResolvedValueOnce(expectedResult);

      const result = await controller.checkOut({ user_data: userData });

      expect(authService.checkOut).toHaveBeenCalledWith(userData);
      expect(result).toBe(expectedResult);
    });
  });
});
