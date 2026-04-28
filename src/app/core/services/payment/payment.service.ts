import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CreateSessionResponse, PaymentDataResponse } from '../../models/payment-data.interface';
import { Order } from '../../models/orders.interface';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private readonly httpClient = inject(HttpClient);
  createCashOrder(cartId:string | null , data:object ):Observable<PaymentDataResponse>{
    return this.httpClient.post<PaymentDataResponse>(environment.base_url + `/api/v1/orders/${cartId}` , data )
  }
  getUserOrders(userId:string | null ):Observable<Order[]>{
    return this.httpClient.get<Order[]>(environment.base_url + `/api/v1/orders/user/${userId}`)
  }
  createVisaOrder(cartId:string | null , data:object ):Observable<CreateSessionResponse>{
    return this.httpClient.post<CreateSessionResponse>(environment.base_url + `/api/v1/orders/checkout-session/${cartId}?url=${environment.url}` , data )
  }
}
