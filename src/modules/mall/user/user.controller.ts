import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiException } from 'src/modules/common/exception';
import { CreateUserDto} from './user.dto';
import { UserService } from './user.service';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
@ApiTags("User")
export class UserController {
  constructor(
    private readonly userService:UserService
  ){}
  @Post()
  @ApiOperation({ summary: '新增一个用户' })
  create(@Body() user:CreateUserDto){
    return this.userService.create(user)
  }
  @Get()
  @ApiOperation({summary:"查询一个用户信息"})
  @ApiQuery({name:"id"})
  findOne(@Query("id") id){
    if(isNaN((+id))) throw new ApiException(10004,404)
    return this.userService.findOne(+id)
  }

}
