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

  public get _getUserData(){
    let userData = localStorage.getItem("userInfo");

    if (userData) userData = JSON.parse(userData);
    else userData = null;

    return userData;
  }

  login(data: loginInterface): Observable<any>{
    return this.http.post<loginResponse>(`${this.url_api}/auth/login`, data);
  }

  setUserData(data: any){
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
