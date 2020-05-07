import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpResponse, HttpEvent } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable } from "rxjs";
import { map, filter, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req, next) : Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthService);
    const tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`
      }
    });
    return next.handle(tokenizedReq);
  }


}
