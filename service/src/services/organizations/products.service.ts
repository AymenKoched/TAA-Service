import { Injectable } from '@nestjs/common';

import { AuthErrors, CrudService } from '../../common';
import { Product } from '../../entities';
import { ProductsRepository } from '../../repositories';

@Injectable()
export class ProductsService extends CrudService<Product> {
  protected notFoundErrorKey = AuthErrors.ProductNotFound;
  protected notFoundErrorMessage = 'The searched product is not found';

  constructor(private readonly products: ProductsRepository) {
    super(products);
  }
}
