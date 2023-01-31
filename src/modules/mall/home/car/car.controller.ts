import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiException } from 'src/modules/common/exception';
import { IdsDTO } from '../../common.dto';
import { illegalId } from '../../common.utils';
import { CreateCarDto, UpdateCarDto, UpdateCheckedDto } from './car.dto';
import { CarService } from './car.service';

@Controller('car')
@ApiTags("car")
export class CarController {
  constructor(
    private readonly carService:CarService
  ){}
  @Post()
  @ApiOperation({summary:"在购物车创建一条新的商品数据"})
  async create(@Body() dto:CreateCarDto){
    // await this.carService.check(dto.carId)
    // console.log(333);
    
    return this.carService.create(dto)
  }
  @ApiOperation({summary:"根据用户id查询自己的购物车数据"})
  @Get(":id")
  @ApiParam({name:"id"})
  findOne(@Param("id") id:string){
    /**判断id是否是数字的字符串 */
    illegalId(id)
    return this.carService.findOne(+id)
  }
  @ApiOperation({summary:"在购物车更新一条的商品数据"})
/**更新单个商品 */
  @Patch(":id")
  update(@Body() dto:UpdateCarDto,@Param("id") id){
    // if(dto.id){
    //   return this.carService.updateChecked(dto)
    // }
    // return this.carService.update(+id,dto)
    return dto
  }
  /**用来更新购物车选中状态 */
  @Patch()
  updateChecked(@Body() dto:UpdateCheckedDto){
    return this.carService.updateChecked(dto)
    // UpdateCheckedDto
  }
  @ApiOperation({summary:"在购物车删除一条的商品数据"})
  @Delete()
  delete(@Body("id") dto:IdsDTO){
    return this.carService.deleteCarShopping(dto.ids)
  }
}
