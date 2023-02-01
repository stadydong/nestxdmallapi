import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constant';

import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // private testService:TestService,
    private readonly authService:AuthService,
  ) {
    super({
      // jwtFromRequest: ExtractJwt.fromBodyField("token"),
      // jwtFromRequest:ExtractJwt.fromHeader("token"),
      jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),  //验证token的方式
      ignoreExpiration: false,    //是否忽略到期
      secretOrKey: jwtConstants.secret,
    });
  }
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}