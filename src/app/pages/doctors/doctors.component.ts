import { Component, OnInit } from '@angular/core';
import { tableColumnInterface } from '../../shared/interfaces/table-columns.interface';
import { TableModule } from 'primeng/table';
import { NgClass, NgStyle } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AdminService } from '../../shared/services/admin.service';
import { commonResponse } from '../../shared/interfaces/response.interface';
import { FormDoctorComponent } from './components/form-doctor/form-doctor.component';
import { FormSpecialtyComponent } from './components/form-specialty/form-specialty.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { tooltipComponent } from '../../shared/components/tooltip/tooltip.component';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss'],
  standalone: true,
  imports: [
    TableModule,
    NgClass,
    ButtonModule,
    FormDoctorComponent,
    FormSpecialtyComponent,
    ToastModule,
    ConfirmDialogModule,
    tooltipComponent,
    NgStyle
  ]
})
export class DoctorsComponent  implements OnInit {

  doctorsList: any = [];

  showSpecialtiesList: boolean = false;
  titleSpecialtiesList: String = "";

  showFormDoctor: boolean = false;
  dataForm: any = {};
  titleForm: String = "Crear médico";

  columns: tableColumnInterface[] = [];

  constructor(
    public adminService: AdminService,
    public confirmationService: ConfirmationService,
    public message: MessageService,
  ) { }

  ngOnInit() {
    this.columns = this.getTableColumn();
    this.get()
  }

  get(){
    this.adminService.getAllDoctors().subscribe({
      next: (data: commonResponse) => {
        console.log(data);
        this.doctorsList = data.object;
      },
      error: (e: any) => {
        console.log(e);
      }
    });
  }

  showForm(data: any, title: String){
    this.dataForm = data;
    this.titleForm = title;
    this.showFormDoctor = true;
  }

  showSpecialties(){
    this.showSpecialtiesList = true;
    this.titleSpecialtiesList = "Especialidades";
  }

  closeForm(e: any){
    this.dataForm = {};
    this.showFormDoctor = false;
    this.showSpecialtiesList = false;
    this.get();
  }

  deleteDoctor(id: Number, e: any){
    this.confirmationService.confirm({
      target: e.target as EventTarget,
      message: "¿Estás seguro de borrar el médico?",
      header: "Eliminar médico",
      icon: 'pi pi-exclamation-circle',
      rejectButtonStyleClass: "btn-reject",
      acceptButtonStyleClass: "btn-acept",
      acceptLabel: "Aceptar",
      rejectLabel: "Cancelar",
      accept: () =>{
        this.adminService.deleteDoctor(id).subscribe({
          next: (data: commonResponse) => {
            this.message.add({
              severity: "success",
              summary: "Éxito",
              detail: "El médico se ha eliminado correctamente"
            });
            this.get();
          },
          error: (e) => {
            console.log(e);
            this.message.add({
              severity: "error",
              summary: "Error",
              detail: "Ha ocurrido un error al eliminar el médico"
            });
          }
        })
      },
      
    })
  }

  private getTableColumn(): tableColumnInterface[] {
    return [
      {
        key: "correo",
        title: "Correo",
        textAlign: "center"
      },
      {
        key: "nombre_completo",
        title: "Nombre completo",
        textAlign: "center"
      },
      {
        key: "descripcion",
        title: "Especialidad",
        textAlign: "center"
      },
      {
        key: "cedula",
        title: "Cédula",
        textAlign: "center"
      },
      {
        key: "num_telefono",
        title: "Teléfono",
        textAlign: "center"
      },
      {
        key: 'actions',
        title: "Acciones",
        textAlign: 'center'
      }
    ]
  }

}
