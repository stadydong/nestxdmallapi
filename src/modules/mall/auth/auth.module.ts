import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from '../constant';
import { HomeModule } from '../home/home.module';

import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  providers: [AuthService,JwtStrategy,UserService],
  imports:[
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    }),
    PassportModule,
    UserModule,
    HomeModule
  ],
  exports: [AuthService]
})
export class AuthModule {}
