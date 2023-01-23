import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userInfo } from 'os';
import { ApiException } from 'src/modules/common/exception';
import { CreateUserDto } from '../user/user.dto';
import { UserService } from '../user/user.service';

/**
 * 用户登录获取token
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService:JwtService,
    private userService:UserService,
  ){}
  /**
   * 验证用户登录的信息
   */
  async validateUser(user:CreateUserDto){
    // console.log(user);
    
    const userInfo = await this.userService.findUserName(user.username)
    if(userInfo && user.password === userInfo.password){
      const {password,...UserInfo} = userInfo
      return UserInfo
    }
      // throw new ApiException(5000,401)

    return null
    
  }
  /**
   * 用户信息通过生成token派发
   */
  login(payload:any){
    /**
     * 生成token并返回
     */
    return this.jwtService.sign(payload)
  }
}
