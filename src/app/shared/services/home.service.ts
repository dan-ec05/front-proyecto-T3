import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private url_api: String;

  constructor(
    private http: HttpClient
  ) {
    this.url_api = `${environment.API}/api`;
  }

  getTotalAmount(): Observable<any>{
    return this.http.get(`${this.url_api}/dashboard/get-total-amount`);
  }
}
