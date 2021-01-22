import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { LocalStorageConstants } from '../core/constants/localstorage.constants';
import { RouteConstants } from '../core/constants/route-constants';
import { CustomHttpService } from '../core/services/http.service';
import { ILoggedInResponse } from '../shared/interface/i-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: CustomHttpService, private _router: Router) {}

  /*Verify once again*/
  loggedIn() {
    return !!this.getToken();
  }

  getToken() {
    return localStorage.getItem(LocalStorageConstants.EMAIL_ID);
  }

  /*Use model rather than any*/
  loginUser(user) {
    return this._http.post('login', user).pipe(
      tap((response: ILoggedInResponse) => {
        this.saveAuthTokens(response);
      })
    );
  }

  signUpUser(user) {
    return this._http.post('sign_up', user).pipe(
      tap((response) => {
        this.saveAuthTokens(response);
      })
    );
  }

  saveAuthTokens(res) {
    localStorage.setItem(LocalStorageConstants.EMAIL_ID, res.email_id);
  }

  logoutUser() {
    localStorage.removeItem(LocalStorageConstants.EMAIL_ID);
    this._router.navigate([RouteConstants.LOGIN]);
  }
}
