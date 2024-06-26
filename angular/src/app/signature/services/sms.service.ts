import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { KeyclockSecurityService } from "src/app/services/keyclock-security.service";

@Injectable({
  providedIn: "root",
})
export class SmsService {
  constructor(
    private http: HttpClient,
    private tokenservice: KeyclockSecurityService
  ) {}

  token(): Observable<any> {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const body = {
      grant_type: "client_credentials",
      client_id: "J5IJ1SgIbKUPG0Fw964G2FDAHAOg7suy",
      client_secret: "A6oeVw2Gx6gykbv1",
    };

    return this.http.post(" https://api.orange.com/oauth/v3/token", body, {
      headers: headers,
    });
  }

  sendSmS(
    code: string,
    recipientPhone: string,
    token: string
  ): Observable<any> {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    const body = JSON.stringify({
      outboundSMSMessageRequest: {
        address: "tel:+216" + recipientPhone,
        senderAddress: "tel:+21653009355",
        outboundSMSTextMessage: { message: code },
      },
    });
    console.log(body);

    return this.http.post(
      "https://api.orange.com/smsmessaging/v1/outbound/tel:+21653009355/requests",
      body,
      {
        headers: headers,
      }
    );
  }
}
