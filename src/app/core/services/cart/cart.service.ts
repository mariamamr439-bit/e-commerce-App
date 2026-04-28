import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CartDataResponse } from '../../models/cart-data.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);
  cartCount:WritableSignal<number> = signal<number>(0);
  addProductToCart(id: string): Observable<CartDataResponse> {
    return this.httpClient.post<CartDataResponse>(environment.base_url + '/api/v2/cart', {
      productId: id,
    });
  }
  getLoggedUserCart(): Observable<CartDataResponse> {
    return this.httpClient.get<CartDataResponse>(environment.base_url + '/api/v2/cart');
  }
  updateCartProductQuantity(id: string, countNumber: number): Observable<any> {
    return this.httpClient.put<any>(environment.base_url + `/api/v2/cart/${id}`, {
      count: countNumber,
    });
  }
  RemoveProductFromCart(id: string): Observable<CartDataResponse> {
    return this.httpClient.delete<CartDataResponse>(environment.base_url + `/api/v2/cart/${id}`);
  }
  clearUserCart(): Observable<any> {
    return this.httpClient.delete<any>(environment.base_url + '/api/v2/cart');
  }
}
