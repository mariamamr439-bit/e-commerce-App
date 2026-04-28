import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BrandsDataResponse } from '../../models/brands-data.interface';
import { BrandDetailsResponse } from '../../models/brand-details.interface';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  private readonly httpClient = inject(HttpClient);
  getAllBrands(): Observable<BrandsDataResponse> {
    return this.httpClient.get<BrandsDataResponse>(environment.base_url + '/api/v1/brands');
  }
  getSpecificBrand(brandId: string | null): Observable<BrandDetailsResponse> {
    return this.httpClient.get<BrandDetailsResponse>(environment.base_url + `/api/v1/brands/${brandId}`);
  }
}
