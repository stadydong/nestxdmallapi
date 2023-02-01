import { Body, Controller, Get, Post, Query, Res, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ApiException } from 'src/modules/common/exception';
import { wxPayDto } from './pay.dto';
import { PayService } from './pay.service';

@Controller('pay')
@ApiTags("pay")
export class PayController {
  constructor(
    private readonly payService:PayService
  ){}
  /**支付成功调用的接口 */
  @ApiOperation({description:"支付成功调用的接口"})
  @Get("wx")
  wxPay(@Query() query:wxPayDto){
    return this.payService.wxPay(query)
  }
  /**支付失败调用的接口 */
  @ApiOperation({description:"支付失败调用的接口"})
  @Get("fail")
  async FailPay(@Query() query:wxPayDto){
    await this.payService.wxPay(query,"已取消支付")
    throw new ApiException(110001)
  }
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({description:"获取支付二维码"})
  @Get("codeImg")
  GetcodeImg(@Query() dto:wxPayDto,@Session() session:any){
    return this.payService.GetcodeImg(dto)
  }
}
