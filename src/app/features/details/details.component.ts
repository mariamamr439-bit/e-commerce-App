import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { ProductDetails } from '../../core/models/product-details.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit{
  private readonly  activatedRoute = inject(ActivatedRoute);
  private readonly  productsService = inject(ProductsService);
  productId:WritableSignal<string | null> = signal<string | null>(null);
  productDetails:WritableSignal<ProductDetails> = signal<ProductDetails>({} as ProductDetails)
  ngOnInit(): void {
    this.getProductId();
    this.getSpecificProductData();
  }
  getProductId():void{
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams)=>{
        this.productId.set(urlParams.get('id'))
      },
    })
  }
  getSpecificProductData():void{
    this.productsService.getSpecificProduct(this.productId()).subscribe({
      next: (res)=>{
        this.productDetails.set(res.data)
      }
    })
  }
}
