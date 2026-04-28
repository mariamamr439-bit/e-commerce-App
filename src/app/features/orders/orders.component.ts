import { DatePipe, isPlatformBrowser } from '@angular/common';
import {
  Component,
  computed,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { PaymentService } from '../../core/services/payment/payment.service';
import { Order } from '../../core/models/orders.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders',
  imports: [DatePipe, RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  private readonly paymentService = inject(PaymentService);
  private readonly platform = inject(PLATFORM_ID);

  userId: WritableSignal<string | null> = signal<string | null>(null);
  orders: WritableSignal<Order[]> = signal<Order[]>([]);

  //  filter orders with cart items
  filteredOrders = computed(() =>
    this.orders().filter(order => order.cartItems.length > 0)
  );

  ngOnInit(): void {
    this.getUserId();
  }

  //  get user id first THEN call API
  getUserId(): void {
    if (isPlatformBrowser(this.platform)) {
      const userData = localStorage.getItem('userData');

      if (userData) {
        const id = JSON.parse(userData).id;

        this.userId.set(id);

        // 🔥 call API safely here
        this.getUserOrdersData(id);
      }
    }
  }

  //  safer + no null issue
  getUserOrdersData(id: string): void {
    this.paymentService.getUserOrders(id).subscribe({
      next: (res) => {
        this.orders.set(res);
      },
      error: (err) => {
        console.error('Orders error:', err);
      },
    });
  }
}