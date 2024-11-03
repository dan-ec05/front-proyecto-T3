import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private url_api: String;

  constructor(
    private http: HttpClient
  ) {
    this.url_api = `${environment.API}/api`
  }

  getAllDoctorsOffice(filters = {}): Observable<any>{
    return this.http.get(`${this.url_api}/admin/get-all-doctors-office`);
  }

  getAllDoctors(): Observable<any>{
    return this.http.get(`${this.url_api}/admin/get-all-doctors`);
  }

  getAllSchedules(): Observable<any>{
    return this.http.get(`${this.url_api}/admin/get-all-schedules`);
  }

  getAllPayments(): Observable<any>{
    return this.http.get(`${this.url_api}/admin/get-all-payments`);
  }

  getAllSpecialties(): Observable<any>{
    return this.http.get(`${this.url_api}/admin/get-all-specialties`);
  }

  getAllMaintenance(id_office: Number): Observable<any>{
    return this.http.get(`${this.url_api}/admin/get-all-maintenance`);
  }

  addNewDoctorsOffice(body: {num_consultorio: Number, observaciones: String}): Observable<any>{
    return this.http.post(`${this.url_api}/admin/add-doctors-office`, body);
  }

  addNewDoctor(body: {
    nombre_completo: String,
    cedula: String,
    num_telefono: String,
    correo: String,
    especialidad: any
  }): Observable<any>{
    return this.http.post(`${this.url_api}/admin/add-new-doctor`, body);
  }

  addNewSchedule(body: {
    id_consultorio: number,
    id_medico: number,
    condicion: String,
    hora_inicio: String,
    hora_fin: String,
  }): Observable<any>{
    return this.http.post(`${this.url_api}/admin/add-new-schedule`, body);
  };

  addNewPayment(body: {
    id_consultorios_medicos: Number,
    fecha_corte: String,
    fecha_pago: String,
    monto: String
  }): Observable<any>{
    return this.http.post(`${this.url_api}/admin/add-new-payment`, body);
  };

  editSchedule(body: {
    id_consultorio: number,
    id_medico: number,
    condicion: String,
    hora_inicio: String,
    hora_fin: String,
  }): Observable<any>{
    return this.http.post(`${this.url_api}/admin/edit-schedule`, body);
  };

  editDoctor(body: {
    id: number,
    nombre_completo: String,
    cedula: String,
    num_telefono: String,
    correo: String,
    especialidad: any
  }): Observable<any>{
    return this.http.put(`${this.url_api}/admin/edit-doctor`, body);
  }

  editPayment(body: {
    id_consultorios_medicos: Number,
    fecha_corte: String,
    fecha_pago: String,
    monto: String,
    old_id_consultorios_medicos?: Number,
    id_payment: Number
  }): Observable<any>{
    return this.http.post(`${this.url_api}/admin/edit-payment`, body);
  };

  editOffice(body: {num_consultorio: Number, observaciones: String}): Observable<any>{
    return this.http.put(`${this.url_api}/admin/edit-doctors-office`, body);
  }

  addOrUpdateSpecialties(
    body: Array<any>
  ): Observable<any>{
    return this.http.post(`${this.url_api}/admin/add-update-specialties`, body);
  };

  addOrUpdateMaintenance(
    body: Array<any>
  ): Observable<any>{
    return this.http.post(`${this.url_api}/admin/add-update-maintenance`, body);
  };

  deletePayment(id: Number, id_cm: Number): Observable<any>{
    return this.http.delete(`${this.url_api}/admin/delete-payment/${id}/${id_cm}`);
  };

  deleteSchedule(id: Number): Observable<any>{
    return this.http.delete(`${this.url_api}/admin/delete-schedule/${id}`);
  };

  deleteDoctor(id: Number): Observable<any>{
    return this.http.delete(`${this.url_api}/admin/delete-doctor/${id}`);
  };

  deleteSpecialty(id: Number): Observable<any>{
    return this.http.delete(`${this.url_api}/admin/delete-specialty/${id}`);
  };

  deleteMaintenance(id: Number): Observable<any>{
    return this.http.delete(`${this.url_api}/admin/delete-maintenance/${id}`);
  };

  deleteOffice(id: Number): Observable<any>{
    return this.http.delete(`${this.url_api}/admin/delete-office/${id}`);
  };
}
