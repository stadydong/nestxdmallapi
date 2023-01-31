import { Injectable } from '@nestjs/common';
import { ApiException } from 'src/modules/common/exception';
import { wxPayDto } from './pay.dto';
import * as QRCode from 'qrcode'
import { OrderListService } from '../../user/order-list/order-list.service';
@Injectable()
export class PayService {
  constructor(private readonly orderListService:OrderListService){}
  wxPay(dto:wxPayDto,order_status:string = "已付款") {
    this.orderListService.create({order_status,carId:dto.carId,userId:dto.userId})
    return new ApiException(110000)
  }
  async GetcodeImg(dto:wxPayDto){
    // res.type("image/png")
    let codeImgString = ""
    codeImgString =  await QRCode.toDataURL(`http://192.168.10.123:3000/pay/wx?carId=${dto.carId}&userId=${dto.userId}`,{width:400})
    
    // res.send(codeImgString)
    return codeImgString
  }
}
