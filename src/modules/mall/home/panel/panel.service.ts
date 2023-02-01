import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GoodsEntities } from 'src/entities/mall/home-goods.entities';
import { PanelEntities } from 'src/entities/mall/home-panel.entities';
import { ApiException } from 'src/modules/common/exception';
import { DataSource, Repository } from 'typeorm';
import { GoodsService } from '../goods/goods.service';
import { ProductDetailService } from '../product-detail/product-detail.service';
import { ProductService } from '../product/product.service';
import { CreatePanelDto } from './panel.dto';

@Injectable()
export class PanelService {
  constructor(
    @InjectRepository(GoodsEntities)
    private goodsRepository: Repository<GoodsEntities>,
    @InjectRepository(PanelEntities)
    private repositoryPanel: Repository<PanelEntities>,
    private readonly goodsService: GoodsService,
    private readonly dataSource: DataSource,
    private readonly productService:ProductService
  ) {}
  async create(dto: CreatePanelDto) {
    const Panel = new PanelEntities();

    // const goods = await this.goodsService.findOne(1);
    const goods = await this.goodsRepository.findOne({where:{
      id:dto.pid
    }})

    if (!goods) throw new ApiException(10000);
    // Panel.title = dto.title
    // Panel.price = dto.price
    // Panel.
    
    Object.assign(Panel, dto);

    //只需要一方报错即可
    Panel.goods = goods;
    /**查询是否有该产品 */

    const product = await this.productService.findOne(dto.productId)
    
    Panel.productId = product
    // console.log(Panel);
    await this.dataSource.transaction(async (manager) => {
        await manager.save(Panel);

    });
    return new ApiException(100000);
  }

}
