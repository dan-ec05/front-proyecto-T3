import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuperadminService {

  private url_api: String;

  constructor(
    private http: HttpClient
  ) { 
    this.url_api = `${environment.API}/api`;
  }

  getAllUsers(): Observable<any>{
    return this.http.get(`${this.url_api}/superadmin/get-all-users`);
  }

  getAllSecurityQ(): Observable<any>{
    return this.http.get(`${this.url_api}/superadmin/get-all-security-q`);
  }

  addNewUser(
    body: {
      nombre: String,
      usuario: String,
      contraseña: String,
      cargo: "admin" | "superadmin" | "regular",
      id_pregunta_seguridad: Number,
      respuesta_seguridad: String,
      correo: String
    }
  ): Observable<any>{
    return this.http.post(`${this.url_api}/superadmin/add-user`, body);
  }

  updateUser(
    body: {
      nombre: String,
      usuario: String,
      contraseña: String,
      cargo: "admin" | "superadmin" | "regular",
      id_pregunta_seguridad: Number,
      respuesta_seguridad: String,
      correo: String,
      id: Number
    }
  ): Observable<any>{
    return this.http.post(`${this.url_api}/superadmin/edit-user`, body);
  }

  deleteUser(
    id_user: number
  ): Observable<any>{
    return this.http.delete(`${this.url_api}/superadmin/delete-user/${id_user}`);
  }
}
