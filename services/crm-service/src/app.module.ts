import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // ConfigModule is needed because our shared JwtStrategy depends on ConfigService
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  // No controllers or custom services are needed here
  providers: [JwtStrategy], // Only provide the strategy to validate incoming tokens
  exports: [PassportModule],
})
export class AuthModule {}
