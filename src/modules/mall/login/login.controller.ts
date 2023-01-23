import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { ApiException } from 'src/modules/common/exception'
import { AuthService } from '../auth/auth.service'
import { JwtStrategy } from '../auth/jwt.strategy'

import * as svgCaptcha from 'svg-captcha'
import { LoginDto } from './login.dto'

@Controller('login')
@ApiTags('login')
export class LoginController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  async accountLogin(@Session() session, @Body() user: LoginDto) {
    const userInfo = await this.authService.validateUser(user)
    /**
     * 账号验证成功则生成token
     */
    console.log(session)
    console.log(user.code);
    /**
     * 判断验证码是否正确 如果正常判断账号密码
     */
    if(user.code.toLocaleLowerCase() != session.text.toLocaleLowerCase()) throw new ApiException(5001, 401)
    if (userInfo) {
      let token = this.authService.login(userInfo)
      const { id, username } = userInfo
      return {
        token,
        username,
        id,
      }
    } else {
      /**
       * 抛出账号或密码错误
       */
      throw new ApiException(5000, 401)
    }
  }
  /**
   * 测试token验证是否成功
   */
  @Post('test')
  @UseGuards(AuthGuard('jwt'))
  validateToken() { // @ApiHeader({name:"Authorization: Bearer"}) header
    return 123
  }
  /**
   * 获取验证码图片
   */
  @Get('code')
  Getcode(@Req() req: any, @Res() res: Response, @Session() session) {
    const captcha = svgCaptcha.create({
      width:100,
      height:40,
      size:4,
      background:"white"
    })
    /**
     * 把图片验证的文件存储到session里
     */
    session.text = captcha.text
    res.type('image/svg+xml')
    res.send(captcha.data)
  }
}
