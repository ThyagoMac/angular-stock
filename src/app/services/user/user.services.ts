import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import {
  UserLoginInterface,
  UserLoginResponseInterface,
  UserSignupInterface,
  UserSignupResponseInterface,
} from 'src/app/models/interfaces/user';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient, private cookie: CookieService) {}

  signupUser(
    data: UserSignupInterface
  ): Observable<UserSignupResponseInterface> {
    return this.http.post<UserSignupResponseInterface>(
      `${this.API_URL}/user`,
      data
    );
  }

  authUser(data: UserLoginInterface): Observable<UserLoginResponseInterface> {
    return this.http.post<UserLoginResponseInterface>(
      `${this.API_URL}/auth`,
      data
    );
  }

  isLogged(): boolean {
    const token = this.cookie.get('USER_TOKEN');
    return token ? true : false;
  }
}
