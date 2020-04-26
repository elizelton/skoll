import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from 'src/app/pages/login/login.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    isRefreshing = false;

  constructor(public loginService: LoginService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.loginService.getToken()) {
      request = this.addToken(request, this.loginService.getToken());
    }

    return next.handle(request);

    }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

}