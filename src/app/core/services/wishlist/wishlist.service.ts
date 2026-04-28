import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { WishlistDataResponse, WishlistloggedResponse } from '../../models/wishlist-data.interface';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly httpClient = inject(HttpClient);
  addProductToWishlist(id: string): Observable<WishlistDataResponse> {
    return this.httpClient.post<WishlistDataResponse>(environment.base_url + `/api/v1/wishlist`, {
      productId: id,
    });
  }

  getLoggedUserWishlist(): Observable<WishlistloggedResponse> {
    return this.httpClient.get<WishlistloggedResponse>(environment.base_url + `/api/v1/wishlist`)
  }

  removeProductFromWishlist(id:string): Observable<WishlistDataResponse> {
    return this.httpClient.delete<WishlistDataResponse>(environment.base_url + `/api/v1/wishlist/${id}`)
  }
}
