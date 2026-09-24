import {
  ConflictException,
  Injectable,
  Inject,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '../../Database/Prisma/Generated/client.js';
import { AUTH_REPO } from './Repo/IAuth.repository.js';
import type { IAuthRepository } from './Repo/IAuth.repository.js';
import { UserDto } from './Models/DTO/UserDto.js';
import bcrypt from "bcrypt";
import { AuthResponse } from './Models/Response/AuthResponse.js';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './Models/Response/LoginResponse.js';
import { LoginDto } from './Models/DTO/LoginDto.js';
import { RegisterResponse } from './Models/Response/RegisterResponse.js';

@Injectable()
export class AuthService {
  constructor (
    @Inject(AUTH_REPO)
    private readonly repo: IAuthRepository,
    private readonly jwtService: JwtService,
  ){}

  async login(dto: LoginDto): Promise<AuthResponse> {
    let response: LoginResponse;

    try {
      response = await this.repo.login(dto.username);
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new UnauthorizedException('Ongeldige gebruikersnaam of wachtwoord');
      }

      throw new InternalServerErrorException('Er is een onverwachte fout opgetreden');
    }

    const isValid = await bcrypt.compare(dto.password, response.passwordHash);

    if (!isValid) {
      throw new UnauthorizedException('Ongeldige gebruikersnaam of wachtwoord')
    }

    const payload = {
      sub: response.id,
      username: response.username,
      role: response.role,
      studentId: response.studentId ?? null,
      teacherId: response.teacherId ?? null,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      access_token: accessToken,
      refresh_token: '',
    };
  }

  async createUser(dto: UserDto): Promise<AuthResponse> {
    dto.password = await bcrypt.hash(dto.password, 12)

    let response: RegisterResponse;

    try {
      response = await this.repo.createUser(dto);
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Gebruikersnaam al in gebruik');
      }
      else
        { throw new InternalServerErrorException('Er is een onverwachte fout opgetreden') }
    }

    const payload = {
      sub: response.id,
      username: response.username,
      role: response.role,
      studentId: response.studentId ?? null,
      teacherId: response.teacherId ?? null,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      access_token: accessToken,
      refresh_token: '',
    };
  }
}
