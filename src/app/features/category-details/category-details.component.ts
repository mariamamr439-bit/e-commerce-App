import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { CartService } from '../../core/services/cart/cart.service';
import { ProductsService } from '../../core/services/products/products.service';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { CategoryDetails } from '../../core/models/category-details.interface';
import { CurrencyPipe } from '@angular/common';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-category-details',
  imports: [RouterLink , CurrencyPipe],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css',
})
export class CategoryDetailsComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);
  
  categoryId: WritableSignal<string | null> = signal<string | null>(null);
  categoryDetails: WritableSignal<CategoryDetails> = signal<CategoryDetails>({} as CategoryDetails);
  subcategories: WritableSignal<any[]> = signal<any[]>([]);
  products: WritableSignal<any[]> = signal<any[]>([]);

  ngOnInit(): void {
    this.getCategoryId();
  }
  
  getCategoryId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.categoryId.set(urlParams.get('id'));
        this.getSpecificCategoryData();
        this.getSubcategoriesByCategory();
      },
    });
  }
  
  getSpecificCategoryData(): void {
    this.categoriesService.getSpecificCategory(this.categoryId()).subscribe({
      next: (res) => {
        this.categoryDetails.set(res.data);
      }
    });
  }
  
  getSubcategoriesByCategory(): void {
    // Get all subcategories and filter by current category ID
    this.productsService.getAllSubcategories().subscribe({
      next: (res) => {
        const filteredSubcategories = res.data.filter(
          (subcategory: any) => subcategory.category === this.categoryId()
        );
        this.subcategories.set(filteredSubcategories);
        
        // After getting subcategories, fetch products for each subcategory separately
        if (filteredSubcategories.length > 0) {
          this.getProductsFromSubcategories(filteredSubcategories);
        } else {
          // If no subcategories, try to get products directly by category
          this.getProductsByCategory();
        }
      },

    });
  }
  
  getProductsFromSubcategories(subcategories: any[]): void {
    // Create an array of observables for each subcategory
    const requests = subcategories.map(subcategory => 
      this.productsService.getProductsBySubcategory(subcategory._id)
    );
    
    // Use forkJoin to execute all requests in parallel
    forkJoin(requests).subscribe({
      next: (responses) => {
        const allProducts: any[] = [];
        responses.forEach((res) => {
          if (res && res.data && res.data.length > 0) {
            allProducts.push(...res.data);
          }
        });
        this.products.set(allProducts);
      },

    });
  }
  
  getProductsByCategory(): void {
  
    this.productsService.getProductsByCategory(this.categoryId()).subscribe({
      next: (res) => {
        this.products.set(res.data);
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
      }
    });
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