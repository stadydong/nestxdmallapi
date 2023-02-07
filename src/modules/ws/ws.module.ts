import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserChatEntities } from 'src/entities/mall/user-chat.entities';
import { UserModule } from '../mall/user/user.module';
import { UserChatModule } from '../userChat/userChat.module';
import { WsGateway } from './ws.gateway';
import { WsService } from './ws.service';


@Module({
  providers: [WsGateway,WsService],
  imports:[UserModule,UserChatModule]
})
export class WsModule {}
