import { Injectable } from '@nestjs/common';

import { Product } from '../../entities';
import { BaseReclamationSubscriber } from './basic.subscriber';

@Injectable()
export class ProductSubscriber extends BaseReclamationSubscriber<Product> {
  protected readonly entityCtor = Product;
  protected readonly entityName = Product.name;
}
