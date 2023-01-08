import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GoodsEntities } from 'src/entities/mall/home-goods.entities';
import { PanelEntities } from 'src/entities/mall/home-panel.entities';
import { ApiException } from 'src/modules/common/exception';
import { DataSource, Repository } from 'typeorm';
import { GoodsService } from '../goods/goods.service';
import { CreatePanelDto } from './panel.dto';

@Injectable()
export class PanelService {
  constructor(
    @InjectRepository(GoodsEntities)
    private repositoryGoods: Repository<GoodsEntities>,
    @InjectRepository(PanelEntities)
    private repositoryPanel: Repository<PanelEntities>,
    private goodsService: GoodsService,
    private dataSource: DataSource,
  ) {}
  async create(dto: CreatePanelDto) {
    const Panel = new PanelEntities();
    const Goods = await this.goodsService.findOne(dto.pid);
    if (!Goods) throw new ApiException(10000);
    Object.assign(Panel, dto);
    //只需要一方报错即可
    Panel.goods = Goods;

    const result = await this.dataSource.transaction(async (manager) => {
      try {
        await manager.save(Goods);
        await manager.save(Panel);
        return '成功';
      } catch (error) {
        return error;
      }
    });
    return result;
  }
}
