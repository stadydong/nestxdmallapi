import { Test, TestingModule } from '@nestjs/testing';
import { OrderListController } from './order-list.controller';

describe('OrderListController', () => {
  let controller: OrderListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderListController],
    }).compile();

    controller = module.get<OrderListController>(OrderListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
