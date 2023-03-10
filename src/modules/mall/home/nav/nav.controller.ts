import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateNavDto } from './nav.dto';
import { NavService } from './nav.service';

@ApiTags("nav")
@Controller('nav')
@UseGuards(AuthGuard('jwt'))
export class NavController {
  constructor(
    private navService:NavService
  ){}
  @ApiOperation({description:"创建一个新的模块",summary:"创建一个新的导航模块"})
  @Post()
  create(@Body() dto:CreateNavDto){
    return  this.navService.create(dto)
  }
  @ApiOperation({description:"查找所有模块",summary:"查找所有模块"})

  @Get()
  find(){
    return this.navService.find()
  }
}
