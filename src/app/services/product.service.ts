import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private api = 'https://newluizalabsapi.herokuapp.com/';

  constructor(private http: HttpClient) { }

  readProducts(): Observable<any> {
    return this.http.get(`${this.api}products`).pipe(
      map(results => {
        return results;
      })
    );
  }

  readProductsByAllFilters(title: string, category: string): Observable<any> {
    return this.http.get(`${this.api}products/allfilters/${title}/${category}`).pipe(
      map(results => {
        return results;
      })
    );
  }

  readProductsByCategory(category: string): Observable<any> {
    return this.http.get(`${this.api}products/category/${category}`).pipe(
      map(results => {
        return results;
      })
    );
  }

  readProductsByTitle(title: string): Observable<any> {
    return this.http.get(`${this.api}products/title/${title}`).pipe(
      map(results => {
        return results;
      })
    );
  }

  getDetails(id) {
    return this.http.get(`${this.api}products/id/${id}`);
  }

  createProduct(data: any) {
    return this.http.post(`${this.api}products`, data);
  }

  updateProduct(data: any) {
    return this.http.put(`${this.api}products`, data);
  }

  deleteProduct(id) {
    return this.http.delete(`${this.api}products/${id}`);
  }

}
