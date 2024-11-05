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
    let userData: any = sessionStorage.getItem("userInfo");

    if (userData) userData = JSON.parse(userData);
    else userData = null;

    return userData;
  };

  getToken(id_user: number): Observable<any>{
    return this.http.get<any>(`${this.url_api}/auth/token/${id_user}`);
  }

  login(data: loginInterface): Observable<any>{
    return this.http.post<commonResponse>(`${this.url_api}/auth/login`, data);
  }

  setUserData(data: any){
    if (sessionStorage.getItem("userInfo")) sessionStorage.removeItem("userInfo");
    sessionStorage.setItem("userInfo", JSON.stringify(data));
  }

  blockSesion(usuario: any): Observable<any>{
    return this.http.get<commonResponse>(`${this.url_api}/auth/block-user/${usuario}`);
  }

  unlockUser(id_user: any, auth: {password: any, username: any}): Observable<any>{
    return this.http.post<commonResponse>(`${this.url_api}/auth/unlock-user/${id_user}`, auth);
  }

  getSecurityQuestion(username: string): Observable<any>{
    return this.http.get(`${this.url_api}/auth/security-question/${username}`);
  }

  checkAnswer(body: {
    answer: string,
    id_user: number
  }): Observable<any>{
    return this.http.post(`${this.url_api}/auth/check-answer`, body);
  }

  updatePassword(body: {
    password: string,
    id_user: number
  }): Observable<any>{
    return this.http.post(`${this.url_api}/auth/modify-password`, body);
  }

  removeUserData(){
    sessionStorage.removeItem("userInfo");
  }

  logout(id_user: number){
    return this.http.post(`${this.url_api}/auth/logout`, {
      id_user
    });
  }
}
