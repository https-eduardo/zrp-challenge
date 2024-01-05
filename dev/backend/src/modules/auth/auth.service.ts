import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto) {
    try {
      const user = await this.validateUser(loginDto);
      const accessToken = this.jwtService.sign(user, {
        expiresIn: '1h',
      });

      return { accessToken };
    } catch {
      throw new UnauthorizedException();
    }
  }

  private async validateUser({ email, password }: LoginDto) {
    const user = await this.usersService.findByEmail(email);
    if (!user || !this.validatePassword(password, user.password))
      throw new UnauthorizedException();

    delete user.password;
    return user;
  }

  private validatePassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }
}
