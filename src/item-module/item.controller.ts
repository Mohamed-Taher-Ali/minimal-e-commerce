import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth-module/auth.guard';
import { Item } from './item.model';
import { ItemService } from './item.service';


@UseGuards(AuthGuard)
@Controller('/items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('/')
  items(): Item[]{
    return this.itemService.findAllItems();
  }

  @Get('itemsByStatus')
  itemsByStatus(
    @Query('status') status
  ): Item[]{
    return this.itemService.findItemsByStatus(status);
  }

  @Get('itemById/:id')
  itemById(
    @Param('id') id
  ): Item{
    return this.itemService.findItemById(id);
  }
}
