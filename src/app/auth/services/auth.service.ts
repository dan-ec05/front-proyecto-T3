import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginInterface } from '../interfaces/auth.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { commonResponse } from '../../shared/interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url_api: String;

  n_tries: number = 0;

  constructor(
    private http: HttpClient
  ) { 
    this.url_api = `${environment.API}/api`;
    if (!(localStorage.getItem("n_intentos_login_fallido"))){
      localStorage.setItem("n_intentos_login_fallido", String(this.n_tries));
    }

  }

  public get _getUserData(){
    let userData: any = localStorage.getItem("userInfo");

    if (userData) userData = JSON.parse(userData);
    else userData = null;

    return userData;
  };

  login(data: loginInterface): Observable<any>{
    return this.http.post<commonResponse>(`${this.url_api}/auth/login`, data);
  }

  setUserData(data: any){
    if (localStorage.getItem("userInfo")) localStorage.removeItem("userInfo");
    console.log(data);
    localStorage.setItem("userInfo", JSON.stringify(data));
  }

  removeUserData(){
    localStorage.removeItem("userInfo");
  }

  logout(id_user: number){
    return this.http.post(`${this.url_api}/auth/logout`, {
      id_user
    });
  }
}
