import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService} from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _url = "http://127.0.0.1:3000/api";
  private helper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user) {
    return this.http.post<any>(this._url + "/register", user)
  }

  loginUser(user) {
    return this.http.post<any>(this._url + "/login", user)
  }

  loggedIn = () => {
    let tk = this.getToken();
    // console.log("isTokenExpired", this.isTokenExpired(tk));
    // return !!tk;
    return !this.isTokenExpired(tk);
  }

  logout = () => {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken = () => {
    return localStorage.getItem('token');
  }

  isTokenExpired(token?: string): boolean {
    if(!token) token = this.getToken();
    if(!token) return true;

    const date = this.helper.getTokenExpirationDate(token);
    // console.log('User connected until: '+date);
    if(date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }
}
