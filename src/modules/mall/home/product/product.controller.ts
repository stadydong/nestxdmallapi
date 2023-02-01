import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'

import { handler_paginnation } from '../../common.utils'
import { CreateProductDto, orderProductDto } from './product.dto'
import { ProductService } from './product.service'

@UseGuards(AuthGuard('jwt'))
@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @ApiOperation({ summary: '新增一个展示产品' })
  @Post()
  create(@Body() dto: CreateProductDto) {
    console.log(dto)
    return this.productService.create(dto)
  }

  @ApiOperation({ summary: '分页查找所有产品的id' })
  @Get()
  find(@Query() query: orderProductDto) {
    handler_paginnation(query)
    return this.productService.find(+query.skip,+query.take,+query.priceOrderType,+query.startPrice,+query.endPrice)
  }
  @Get(':id')
  @ApiParam({name:"id",description:"产品id"})
  findOne(@Param("id") id) {
    return this.productService.findOne(+id)
  }

}
