import { OnModuleInit, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import {  ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io'
import { illegalId } from '../mall/common.utils';
import { GetMessageDto } from './ws.dto';
import { WsService } from './ws.service';

@WebSocketGateway({cors:true})
// @WebSocketGateway(3001,{cors:true})

export class WsGateway implements OnModuleInit{
  @WebSocketServer()
  server:Server
  connectValue:number
  constructor(private readonly wsService:WsService){
    this.connectValue = 0
  }
  onModuleInit() {
    /**监听连接事件 */
    this.server.on("connection",(socket)=>{
      // console.log(socket.id,"connected");
      this.connectValue = this.connectValue + 1
      this.getCurrentPersonNum()

      /**用户断开连接时调用此方法 */
      socket.on("disconnecting",()=>{
        this.connectValue = this.connectValue - 1
        this.getCurrentPersonNum()
      })
    })

    
  }
  @SubscribeMessage("sendMessage")
  async handlerEvent(@MessageBody() payload:GetMessageDto,@ConnectedSocket() client){
    // {"message": "要发送的消息不能为空"}
    /**如果为字符串类型则进行转换 */
    if(typeof payload == "string") {
      payload = JSON.parse(payload)
    }
    // console.log(payload);
    const uid = client.handshake.query.uid
    illegalId(uid)
    if(payload.message == null || payload.message == undefined || payload.message == ""){
      this.ErrorMessage(client.id,"要发送的消息不能为空")
    }else{
      try {
        const MessageObj = await this.wsService.handlerEvent(+uid,payload)
        this.server.emit("newMessage",{
          MessageObj
        })
      } catch (error) {
      this.ErrorMessage(client.id,"用户不存在")
      }
    }

  }
  /**对指定的用户进行发送消息 */
  ErrorMessage(room: string | string[],message:string):void{
    this.server.to(room).emit("errorMessage",{message})
  }
  /**获取当前在线的人数 */
  getCurrentPersonNum(){
    this.server.emit("currentPersonNum",{
      num:this.connectValue
    })
  }
}
