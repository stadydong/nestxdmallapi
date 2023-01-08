import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NavEntities } from 'src/entities/mall/nav.entities'
import { NavController } from './nav/nav.controller'
import { NavService } from './nav/nav.service'
import { GoodsController } from './goods/goods.controller'
import { GoodsService } from './goods/goods.service'
import { GoodsEntities } from 'src/entities/mall/home-goods.entities'
import { PanelEntities } from 'src/entities/mall/home-panel.entities'
import { PanelController } from './panel/panel.controller'
import { PanelService } from './panel/panel.service'
import { ProductController } from './product/product.controller'
import { ProductService } from './product/product.service'
import { ProductDetailService } from './product-detail/product-detail.service'
import { ProductDetailController } from './product-detail/product-detail.controller'
import { ProductEntities } from 'src/entities/mall/product.entities'
import { ProductDetailEntities } from 'src/entities/mall/product-detail.entities'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NavEntities,
      GoodsEntities,
      PanelEntities,
      ProductEntities,
      ProductDetailEntities,
    ]),
  ],
  providers: [
    NavService,
    GoodsService,
    PanelService,
    ProductService,
    ProductDetailService,
  ],
  controllers: [
    NavController,
    GoodsController,
    PanelController,
    ProductController,
    ProductDetailController,
  ],
})
export class HomeModule {}
