import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ProductsDataResponse } from '../../models/products-data.interface';
import { ProductDetailsResponse } from '../../models/product-details.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly httpClient = inject(HttpClient);
  getAllProducts(page: number = 1, limit: number = 10): Observable<ProductsDataResponse> {
    return this.httpClient.get<ProductsDataResponse>(
      environment.base_url + `/api/v1/products?limit=${limit}&page=${page}`,
    );
  }
  getSpecificProduct(productId: string | null): Observable<ProductDetailsResponse> {
    return this.httpClient.get<ProductDetailsResponse>(
      environment.base_url + `/api/v1/products/${productId}`,
    );
  }
  getProductsByBrand(brandId: string | null): Observable<any> {
    return this.httpClient.get(environment.base_url + `/api/v1/products?brand=${brandId}`);
  }
  getAllSubcategories(): Observable<any> {
    return this.httpClient.get<any>(environment.base_url + '/api/v1/subcategories');
  }
  
  // Get products by subcategory (can pass multiple IDs separated by commas)
  getProductsBySubcategory(subcategoryId: string): Observable<ProductsDataResponse> {
  return this.httpClient.get<ProductsDataResponse>(
    environment.base_url + `/api/v1/products?subcategory=${subcategoryId}`
  );
}
  
  // Get products by category (fallback method)
  getProductsByCategory(categoryId: string | null): Observable<ProductsDataResponse> {
    return this.httpClient.get<ProductsDataResponse>(
      environment.base_url + `/api/v1/products?category=${categoryId}`
    );
  }
  
 

}
