import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    // In a real app, you might want to look up the user in the DB
    // to ensure they still exist and are active.
    if (!payload) {
      throw new UnauthorizedException();
    }
    // The payload is what we encoded in the auth service's login method.
    // It will be attached to the request object as request.user.
    return { userId: payload.sub, username: payload.username, roles: payload.roles };
  }
}
