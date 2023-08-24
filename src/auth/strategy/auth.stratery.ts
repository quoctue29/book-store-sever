import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RepositoryProvider } from '@/repository';
import { EStrategy, IReqUser } from '../interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, EStrategy.JWT) {
  constructor(
    configService: ConfigService,
    private repository: RepositoryProvider,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_KEY'),
      issuer: 'API_SERVER',
    });
  }

  async validate(payload: IReqUser): Promise<IReqUser> {
    return {
      id: payload.id,
      email: payload.email,
      userName: payload.userName,
      roles: payload.roles,
      isVerifiedEmail: payload.isVerifiedEmail,
      subToken: payload.subToken,
    };
  }
}
