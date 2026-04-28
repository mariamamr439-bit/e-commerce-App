import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CategoriesDataResponse } from '../../models/categories-data.interface';
import { CategoryDetailsResponse } from '../../models/category-details.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly httpClient = inject(HttpClient);
  getAllCategories():Observable<CategoriesDataResponse>{
    return this.httpClient.get<CategoriesDataResponse>(environment.base_url + '/api/v1/categories');
  }
  getSpecificCategory(categoryId:string | null):Observable<CategoryDetailsResponse>{
    return this.httpClient.get<CategoryDetailsResponse>(environment.base_url + `/api/v1/categories/${categoryId}`);
  }
}
