import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../common';
import { Product } from '../../entities';

@Injectable()
export class ProductsRepository extends BaseRepository<Product> {
  entityType = Product;
}
