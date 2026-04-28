import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../../../core/services/products/products.service';
import { log } from 'console';
import { ProductsData } from '../../../../core/models/products-data.interface';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SplitPipe } from '../../../../shared/pipes/split-pipe';
import { CartService } from '../../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-popular-products',
  imports: [CurrencyPipe , RouterLink , SplitPipe],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css',
})
export class PopularProductsComponent implements OnInit{
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);
  productList:WritableSignal<ProductsData[]> = signal([])
  ngOnInit(): void {
    this.getAllProductsData();
  }
  getAllProductsData():void{
    this.productsService.getAllProducts().subscribe({
      next: (res)=>{
        this.productList.set(res.data);
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
  addToWishlist(id:string):void{
    this.wishlistService.addProductToWishlist(id).subscribe({
      next:(res)=>{
        if (res.status === 'success') {
          this.toastrService.success(res.message , 'FreshCart App' , {
            progressBar:true,
            closeButton:true,
            timeOut:2400,
          })
        }
      }
    })
  }
}
