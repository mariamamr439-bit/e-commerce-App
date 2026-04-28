import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { BrandsData } from '../../core/models/brands-data.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService);
  brandList: WritableSignal<BrandsData[]> = signal<BrandsData[]>([]);
  ngOnInit(): void {
    this.getAllBrandsData();
  }
  getAllBrandsData():void{
    this.brandsService.getAllBrands().subscribe({
      next:(res) => {
        this.brandList.set(res.data);
      },
    })
  }
}
