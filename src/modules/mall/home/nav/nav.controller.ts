import { Controller, Get, Post } from '@nestjs/common';
import { NavService } from './nav.service';

@Controller('nav')
export class NavController {
  constructor(
    private navService:NavService
  ){}
  @Post()
  create(){
    return  this.navService.create()
  }
  @Get()
  find(){
    return this.navService.find()
  }
}
