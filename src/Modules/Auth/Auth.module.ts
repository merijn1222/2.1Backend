import { Module } from '@nestjs/common';
import { AuthController } from './Auth.controller.js';
import { AuthService } from './Auth.service.js';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: '6000s',
        },
      })
    })
    ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}  
