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

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Intercepting request:", req.url);
    if (!this.securityservice.kc?.authenticated) {
      console.log("User not authenticated, skipping token addition");
      return next.handle(req);
    }

    if (req.url.search("http://localhost:8180/auth/admin") != -1) {
      console.log("Skipping token for admin URL");
      return next.handle(req);
    } else if (req.url.search("cloudinary") != -1) {
      console.log("Skipping token for cloudinary URL");
      return next.handle(req);
    } else if (req.url.search("forsigner") != -1) {
      console.log("Skipping token for forsigner URL");
      return next.handle(req);
    } else {
      const token = this.securityservice.getToken();
      console.log("Adding token to request:", token);
      if (token) {
        let request = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Request with token:", request.headers.get("Authorization"));
        return next.handle(request);
      } else {
        console.log("No token available, sending request without Authorization");
        return next.handle(req);
      }
    }
  }
}