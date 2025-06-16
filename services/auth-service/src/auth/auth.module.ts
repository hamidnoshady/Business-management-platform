import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '@app/common'; // <-- Import from the common package

@Module({
  imports: [
    UsersModule, // Needs access to user data
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigService available throughout the service
    }),
    JwtModule.registerAsync({
      imports: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' }, // Example: tokens expire in 1 hour
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController], // Exposes login/register endpoints
  providers: [AuthService, JwtStrategy], // Provides AuthService to handle logic and JwtStrategy for validation
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
