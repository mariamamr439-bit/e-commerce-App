import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BrandsService } from '../../core/services/brands/brands.service';
import { BrandDetails } from '../../core/models/brand-details.interface';
import { ProductsService } from '../../core/services/products/products.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';
import { CurrencyPipe } from '@angular/common';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-brand-details',
  imports: [RouterLink , CurrencyPipe],
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.css',
})
export class BrandDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly brandsService = inject(BrandsService);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);
  brandId: WritableSignal<string | null> = signal<string | null>(null);
  brandDetails: WritableSignal<BrandDetails> = signal<BrandDetails>({} as BrandDetails);
  products: WritableSignal<any[]> = signal<any[]>([]);
  ngOnInit(): void {
    this.getBrandId();
    this.getSpecificBrandData();
    this.getProductsByBrand();
  }
  getBrandId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.brandId.set(urlParams.get('id'));
      },
    });
  }
  getSpecificBrandData(): void {
    this.brandsService.getSpecificBrand(this.brandId()).subscribe({
      next: (res) => {
        this.brandDetails.set(res.data);
      },
    });
  }
  getProductsByBrand(): void {
    this.productsService.getProductsByBrand(this.brandId()).subscribe({
      next: (res) => {
        this.products.set(res.data);
      },
    });
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
