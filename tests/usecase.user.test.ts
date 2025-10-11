import { UserUseCase } from '../src/usecase/user.usecase.js'; 
import { mockUserRepo } from '../src/domain/repo/mock/user.repo.mock.js'; 
import * as jwt from '../src/infra/jwt/jwt.moct.js';

const jwtConfig = { secret: 'secret', refreshSecret: 'refreshSecret' };

describe('UserUseCase', () => {
  const userUseCase = new UserUseCase(mockUserRepo, jwtConfig);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register a new user', async () => {
    const req = { username: 'newuser', password: 'password123' };
    const result = await userUseCase.register(req);

    expect(result.res.username).toBe('newuser');
    expect(result.passport.acessToken).toBe('mockedToken-newuser');
    expect(result.passport.refreshToken).toBe('mockedToken-newuser');
    expect(mockUserRepo.create).toHaveBeenCalledWith('newuser', 'password123');
  });

  it('should login with correct password', async () => {
    const req = { username: 'existinguser', password: 'password123' };
    const result = await userUseCase.login(req);

    expect(result.res.username).toBe('existinguser');
    expect(result.passport.acessToken).toBe('mockedToken-existinguser');
  });

  it('should throw error with wrong password', async () => {
    const req = { username: 'existinguser', password: 'wrongpassword' };
    await expect(userUseCase.login(req)).rejects.toThrow('Password is invalid!');
  });

  it('should refresh token', async () => {
    const refreshToken = 'mockedToken-existinguser';
    const result = await userUseCase.refreshToken(refreshToken);

    expect(result.res.username).toBe('existinguser');
    expect(result.passport.acessToken).toBe('mockedToken-existinguser');
    expect(result.passport.refreshToken).toBe(refreshToken);
  });
});