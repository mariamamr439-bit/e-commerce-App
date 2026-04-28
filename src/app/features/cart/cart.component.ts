import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { CartData } from '../../core/models/cart-data.interface';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly platform = inject(PLATFORM_ID);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  cartDetails: WritableSignal<CartData> = signal<CartData>({} as CartData);
  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      const token = localStorage.getItem('freshToken');
      if (token) {
        this.getCartData();
      }
    }
  }
  getCartData(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'FreshCart App', {
            progressBar: true,
            closeButton: true,
            timeOut: 2400,
          });
          this.cartDetails.set(res.data);
        }
      },
    });
  }
  removeItemFromCart(id: string): void {
    this.cartService.RemoveProductFromCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'FreshCart App', {
            progressBar: true,
            closeButton: true,
            timeOut: 2400,
          });
          this.cartDetails.set(res.data);
          this.cartService.cartCount.set(res.numOfCartItems);
        }
      },
    });
  }
  updateProductQuantity(id: string, count: number): void {
    this.cartService.updateCartProductQuantity(id, count).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'FreshCart App', {
            progressBar: true,
            closeButton: true,
            timeOut: 2400,
          });
          this.cartDetails.set(res.data);
          this.cartService.cartCount.set(res.numOfCartItems);
        }
      },
    });
  }
  clearCartItems(): void {
    this.cartService.clearUserCart().subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'FreshCart App', {
            progressBar: true,
            closeButton: true,
            timeOut: 2400,
          });
          this.cartDetails.set(res.data);
          this.cartService.cartCount.set(res.numOfCartItems);
        }
      },
    });
  }
}
