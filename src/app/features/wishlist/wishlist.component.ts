import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { Wishlistlogged } from '../../core/models/wishlist-data.interface';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink , CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit{
  private readonly platform = inject(PLATFORM_ID);
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);

  private readonly toastrService = inject(ToastrService);
  wishlistList:WritableSignal<Wishlistlogged[]> = signal<Wishlistlogged[]>([]);
  ngOnInit(): void {
     if (isPlatformBrowser(this.platform)) {
      const token = localStorage.getItem('freshToken');
      if (token) {
        this.getWishlistData();
      }
    }
  }
  getWishlistData():void{
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next:(res)=>{
        if (res.status === 'success') {
          this.wishlistList.set(res.data);
        }
      }
    })
  }
  removeItem(id:string):void{
    this.wishlistService.removeProductFromWishlist(id).subscribe({
      next: (res)=>{
        if (res.status === 'success') {
          this.wishlistList.update(currentItems => 
          currentItems.filter(item => item.id !== id && item._id !== id)
        );
        }
      }
    })
  }
    addProduct(id:string):void{
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        if (res.status === 'success') {
          this.toastrService.success(res.message , 'FreshCart App' , {
            progressBar:true,
            closeButton:true,
            timeOut:2400,
          })
          this.cartService.cartCount.set(res.numOfCartItems);
        }
      }
    })
  }
}
