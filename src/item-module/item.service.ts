import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ErrorMessages } from 'src/app-configs/error-messages';
import { Item, items, ItemStatus } from './item.model';

@Injectable()
export class ItemService {
  private items: Item[];

  constructor() {
      this.items = items;
  }

  findAllItems(){
    return this.items;
  }

  findItemsByStatus(status: ItemStatus = 'active'){
    return this.items.filter(p=>p.status === status);
  }

  findItemById(id: number){
    return this.items.find(p=>p.id == id);
  }

  findItemsByIds(ids: number[]){
    return this.items.filter(p=>ids.includes(p.id));
  }

  checkAllItemsActive(ids: number[]){
    return this
    .findItemsByIds(ids)
    .every(i=> i.status === 'active');
  }

  validateActiveItems(ids: number[]){
    const areAllItemsValid = this.checkAllItemsActive(ids);

    if(!areAllItemsValid) throw new HttpException(
      ErrorMessages.ALL_ITEMS_MUST_BE_ACTIVE,
      HttpStatus.BAD_REQUEST
    );
  }

}
