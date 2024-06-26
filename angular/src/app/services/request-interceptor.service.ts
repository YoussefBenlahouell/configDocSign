import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { KeyclockSecurityService } from "./keyclock-security.service";

@Injectable({
  providedIn: "root",
})
export class RequestInterceptorService implements HttpInterceptor {
  constructor(private securityservice: KeyclockSecurityService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(req.url.indexOf("admin") != -1);
    if (!this.securityservice.kc.authenticated) return next.handle(req);
    console.log(req);

    if (req.url.search("http://127.0.0.1:8180/auth/admin") != -1)
      return next.handle(req);
    else if (req.url.search("cloudinary") != -1) return next.handle(req);
    // else if (req.url.search("change") != -1) return next.handle(req);
    else if (req.url.search("forsigner") != -1) return next.handle(req);
    else {
      let request = req.clone({
        setHeaders: {
          Authorization: "Bearer " + this.securityservice.kc.token,
        },
      });
      return next.handle(request);
    }
  }
}
