import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginInterface, loginResponse } from '../interfaces/auth.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url_api: String;

  constructor(
    private http: HttpClient
  ) { 
    this.url_api = `${environment.API}/api`
  }

  login(data: loginInterface): Observable<any>{
    return this.http.post<loginResponse>(`${this.url_api}/auth/login`, data);
  }

  setDataUser(data: any){
    localStorage.setItem("userInfo", JSON.stringify(data));
  }

  logout(){
    localStorage.removeItem("userInfo");
  }
}
