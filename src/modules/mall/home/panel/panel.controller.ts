import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreatePanelDto } from './panel.dto'
import { PanelService } from './panel.service'

@UseGuards(AuthGuard('jwt'))
//首页板块的内容
@Controller('panel')
@ApiTags('Panel')
export class PanelController {
  constructor(private panelService: PanelService) {}
  @ApiOperation({ summary: '新增一个模块的内容' })
  @Post()
  create(@Body() dto: CreatePanelDto) {
    return this.panelService.create(dto)
  }
  // @ApiOperation({ summary: '更新一个模块的内容' })
  // @Patch()
  // update(){
  //   return this.panelService.update()
  // }
}
