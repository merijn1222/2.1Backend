import { Injectable } from "@nestjs/common";
import { IAuthRepository } from "./IAuth.repository.js";
import { PrismaService } from "../../../Database/Prisma/prisma.service.js";
import type { UserDto } from "../Models/DTO/UserDto.js";
import { LoginResponse } from "../Models/Response/LoginResponse.js";
import { RegisterResponse } from "../Models/Response/RegisterResponse.js";

@Injectable()
export class PostAuthRepository implements IAuthRepository {
  constructor(private readonly prisma: PrismaService) { }

 async createUser(dto: UserDto): Promise<RegisterResponse> {
  const user = await this.prisma.$transaction(async (tx) => {
    const createdUser = await tx.user.create({
      data: {
        username: dto.username.toLowerCase(),
        passwordHash: dto.password,
        role: 'STUDENT',
      },
      select: {
        id: true,
        username: true,
        role: true,
      },
    });

    const createdStudent = await tx.student.create({
      data: {
        name: dto.name,
        userId: createdUser.id,
      },
      select: {
        id: true,
      },
    });

    return {
      id: createdUser.id,
      username: createdUser.username,
      role: createdUser.role,
      studentId: createdStudent.id,
      teacherId: null,
    };
  });
  
  return user;
}

  async login(username: string): Promise<LoginResponse> {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        username: username.toLowerCase(),
      },
      select: {
        id: true,
        username: true,
        passwordHash: true,
        role: true,
        student: {
          select: {
            id: true,
          },
        },
        teacher: {
          select: {
            id: true,
          },
        },
      },
    });

    return {
      id: user.id,
      username: user.username,
      passwordHash: user.passwordHash,
      role: user.role,
      studentId: user.student?.id ?? null,
      teacherId: user.teacher?.id ?? null,
    };
  }
}