import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';
import { ProductsService } from './../../core/services/products/products.service';
import { Component, inject, OnInit, Pipe, signal, WritableSignal } from '@angular/core';
import { ProductsData } from '../../core/models/products-data.interface';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SplitPipe } from '../../shared/pipes/split-pipe';
import { NgxPaginationModule, PaginationInstance } from 'ngx-pagination';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-shop',
  imports: [CurrencyPipe, RouterLink, SplitPipe, NgxPaginationModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  productList: WritableSignal<ProductsData[]> = signal([]);
  pagination: PaginationInstance = { id: 'products', itemsPerPage: 40, currentPage: 1, totalItems: 0 };
  ngOnInit(): void {
    this.getAllProductsData();
  }
  getAllProductsData(): void {
    this.productsService.getAllProducts(this.pagination.currentPage, this.pagination.itemsPerPage).subscribe({
      next: (res) => {
        this.productList.set(res.data);
        this.pagination.totalItems = res.results;
      },
    });
  }

  addProduct(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'FreshCart App', {
            progressBar: true,
            closeButton: true,
            timeOut: 2400,
          });
          this.cartService.cartCount.set(res.numOfCartItems);
        }
      },
    });
  }

  pageChanged(page:number):void{
    this.pagination.currentPage = page ;
    this.getAllProductsData();
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
