import { Module } from '@nestjs/common';
import { HomeModule } from './home/home.module';

@Module({
  controllers: [],
  providers: [],
  imports: [HomeModule],
  exports:[]
})
export class MallModule {}
