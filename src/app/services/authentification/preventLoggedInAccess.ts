import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
  })
export class PreventLoggedInAccess implements CanActivate {

  constructor(private authService: AuthService,private router:Router) {}

  canActivate() {
    return this.authService.isLoggedIn===true?this.router.navigateByUrl('/'):true

  }
} 