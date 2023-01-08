import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateGoodsDto, UpdateCoodsDto } from './goods.dto';
import { GoodsService } from './goods.service';

/**添加首页板块 */
@Controller('goods')
@ApiTags("Goods")
export class GoodsController {
  constructor(private goodsService:GoodsService){}
  @ApiOperation({ summary: '新增活动模块' })
  @Post()
  create(@Body() dto:CreateGoodsDto){
    return this.goodsService.create(dto)
  }
  @ApiOperation({ summary: '查询一个模块' })
  @ApiParam({name:"id",description:"模块的id",required:true})
  @Get(":id")
  findOne(@Param("id") id){
    return this.goodsService.findOne(+id)
  }
  @Get()
  @ApiOperation({ summary: '查询所有模块' })
  find(){
    return this.goodsService.find()
  }
  @ApiOperation({ summary: '更新一个模块' })
  @ApiParam({name:"id",description:"模块的id",required:true})
  @Patch(":id")
  update(@Param("id") id,@Body() dto:UpdateCoodsDto){
    return this.goodsService.update(+id,dto)
  }
}
