import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'
import { FindList } from '../../common.types'
import { illegalId } from '../../common.utils'
import { CreateProductDetail } from './product-detail.dto'
import { ProductDetailService } from './product-detail.service'

@UseGuards(AuthGuard('jwt'))
@ApiTags('product-detail')
@Controller('product-detail')
export class ProductDetailController {
  constructor(private productDetailService: ProductDetailService) {}
  /**只开放在添加产品的时候同时添加产品详情 */
  // @Post()
  // create(@Body() dto: CreateProductDetail) {
  //   return this.productDetailService.create(dto)
  // }
  @Get()
  find(@Query() query: FindList) {
    console.log(query)
    return this.productDetailService.find()
  }
  @Get(':id')
  @ApiParam({description:"产品id",name:"id"})
  findOne(@Param("id") id) {
    illegalId(id)
    return this.productDetailService.findOne(+id)
  }
}
