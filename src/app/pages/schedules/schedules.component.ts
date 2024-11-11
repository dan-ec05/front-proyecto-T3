import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { SchedulesFormComponent } from './schedules-form/schedules-form.component';
import { AdminService } from '../../shared/services/admin.service';
import { commonResponse } from '../../shared/interfaces/response.interface';
import { tableColumnInterface } from '../../shared/interfaces/table-columns.interface';
import { TableModule } from 'primeng/table';
import { NgClass } from '@angular/common';
import moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { tooltipComponent } from '../../shared/components/tooltip/tooltip.component';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss'],
  standalone: true,
  imports: [
    ButtonModule,
    ToastModule,
    SchedulesFormComponent,
    TableModule,
    NgClass,
    ConfirmDialogModule,
    tooltipComponent
  ]
})
export class SchedulesComponent  implements OnInit {

  showScheduleForm: boolean = false;

  schedulesList: Array<any> = [];
  columns: tableColumnInterface[] = [];

  dataForm: any;
  titleForm: String = "";
  constructor(
    public adminService: AdminService,
    public confirmationService: ConfirmationService,
    public message: MessageService
  ) { }

  ngOnInit() {
    this.columns = this.getTableColumn();
    this.get();
  }

  get(){
    this.adminService.getAllSchedules().subscribe({
      next: (data: commonResponse) => {
        data.object.forEach((item: any) => {
          item.condicion_formatted = `(${item.condicion != 'not_used' ? item.condicion : 'SU'}) ${item.condicion == 'M' ? 'Mañana' : item.condicion == 'T' ? 'Tarde' : item.condicion == 'E' ? 'Exclusivo' : 'Sin uso'}`
          item.hora_inicio_formatted = this.formatTime(item.hora_inicio);
          item.hora_fin_formatted = this.formatTime(item.hora_fin);
          item.monto_pagado_formatted = Number(item.pagos.reduce((a: number, b: number) => Number(a) + Number(b), 0));
          item.monto_faltante_formatted = Number(item.monto_restantes[item.monto_restantes.length - 1]);
          item.solvente = Number(item.solvente);
        });
        this.schedulesList = data.object;
        console.log(this.schedulesList);
      },
      error: (e: any) => {}
    })
  }

  deleteSchedule(id: Number, e: any){
    this.confirmationService.confirm({
      target: e.target as EventTarget,
      message: "¿Estás seguro de borrar el horario?",
      header: "Eliminar horario",
      icon: 'pi pi-exclamation-circle',
      rejectButtonStyleClass: "btn-reject",
      acceptButtonStyleClass: "btn-acept",
      acceptLabel: "Aceptar",
      rejectLabel: "Cancelar",
      accept: () =>{
        this.adminService.deleteSchedule(id).subscribe({
          next: (data: commonResponse) => {
            this.message.add({
              severity: "success",
              summary: "Éxito",
              detail: "El horario se ha eliminado correctamente"
            });
            this.get();
          },
          error: (e) => {
            console.log(e);
            this.message.add({
              severity: "error",
              summary: "Error",
              detail: "Ha ocurrido un error al eliminar el horario"
            });
          }
        })
      },
      
    })
  }

  formatTime(time: String){
    let hour = time.split(":")[0];

    if (Number(hour) > 12){
      hour = String(Number(hour) - 12);
      return `${hour}:${time.split(":")[1]} PM`;
    }
    return `${time.slice(0, 5)} AM`;
  }

  showForm(data: any = {}, title: String){
    this.dataForm = data;
    this.titleForm = title;
    this.showScheduleForm = true;
  }

  closeModal(e: any){
    this.showScheduleForm = false;
    this.get();
  }

  private getTableColumn(): tableColumnInterface[] {
    return [
      {
        key: "num_consultorio",
        title: "Consultorio",
        textAlign: "center"
      },
      {
        key: "nombre_completo",
        title: "Médico",
        textAlign: "center",
        width: "150px"
      },
      {
        key: "hora_inicio_formatted",
        title: "Hora de inicio",
        textAlign: "center",
        width: "150px"
      },
      {
        key: "hora_fin_formatted",
        title: "Hora fin",
        textAlign: "center",
        width: "150px"
      },
      {
        key: "condicion_formatted",
        title: "Condición",
        textAlign: "center",
        width: "150px"

      },
      {
        key: 'solvente',
        title: "Solvente",
        textAlign: "center",
        width: "150px"
      },
      {
        key: 'actions',
        title: "Acciones",
        textAlign: 'center'
      }
    ]
  }

}
