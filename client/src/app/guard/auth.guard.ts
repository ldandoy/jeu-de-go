import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router ) { }
  canActivate(): boolean {
    // console.log("canActivate", this.authService.loggedIn());
    if (this.authService.loggedIn()) {
      return true;
    } else {
      this.authService.logout();
      this.router.navigate(['/login']);
      return false;
    }
  }
}
