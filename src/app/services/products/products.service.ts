import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map, Observable } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private API_URL = environment.API_URL;
  private USER_TOKEN = this.cookie.get('USER_TOKEN');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.USER_TOKEN}`,
    }),
  };

  constructor(private http: HttpClient, private cookie: CookieService) {}

  getAllProducts(): Observable<Array<GetAllProductsResponse>> {
    return this.http
      .get<Array<GetAllProductsResponse>>(
        `${this.API_URL}/products`,
        this.httpOptions
      )
      .pipe(map((product) => product.filter((item) => item?.amout > 0)));
  }
}
