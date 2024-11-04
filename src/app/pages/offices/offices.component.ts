import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { OfficesFormComponent } from './components/offices-form/offices-form.component';
import { ToastModule } from 'primeng/toast';
import { AdminService } from '../../shared/services/admin.service';
import { commonResponse } from '../../shared/interfaces/response.interface';
import { tableColumnInterface } from '../../shared/interfaces/table-columns.interface';
import { NgClass } from '@angular/common';
import { MaintenanceFormComponent } from './components/maintenance-form/maintenance-form.component';
import moment from 'moment';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { tooltipComponent } from '../../shared/components/tooltip/tooltip.component';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.scss'],
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    OfficesFormComponent,
    ToastModule,
    NgClass,
    MaintenanceFormComponent,
    ConfirmDialogModule,
    tooltipComponent
  ]
})
export class OfficesComponent  implements OnInit {

  showOfficesForm: boolean = false;
  dataForm: any = {};
  titleForm: String = "";
  id_consultorio: Number = 0;

  showMaintenanceForm: boolean = false;

  officesList: any = [];
  columns: tableColumnInterface[] = [];

  constructor(
    public adminService: AdminService,
    public confirmationService: ConfirmationService,
    public message: MessageService
  ) { }

  ngOnInit() {
    this.columns = this.getTableColumn();
    this.get();
  }

  showForm(title: String = 'Agregar nuevo consultorio', data: any = {}){
    this.showOfficesForm = true;
    this.dataForm = data;
    this.titleForm = title;
  }

  showMaintenanceModal(id: Number, data: any){
    this.showMaintenanceForm = true;
    this.id_consultorio = id;
    this.dataForm = data;
  }
  
  deleteOffice(id: number, e: any){
    this.confirmationService.confirm({
      target: e.target as EventTarget,
      message: "¿Estás seguro de borrar el consultorio?",
      header: "Eliminar consultorio",
      icon: 'pi pi-exclamation-circle',
      rejectButtonStyleClass: "btn-reject",
      acceptButtonStyleClass: "btn-acept",
      acceptLabel: "Aceptar",
      rejectLabel: "Cancelar",
      accept: () =>{
        this.adminService.deleteOffice(id).subscribe({
          next: (data: commonResponse) => {
            this.message.add({
              severity: "success",
              summary: "Éxito",
              detail: "El consultorio se ha eliminado correctamente"
            });
            this.get();
          },
          error: (e) => {
            console.log(e);
            this.message.add({
              severity: "error",
              summary: "Error",
              detail: "Ha ocurrido un error al eliminar el consultorio"
            });
          }
        })
      },
      
    })
  }

  get(){
    this.adminService.getAllDoctorsOffice().subscribe({
      next: (data: commonResponse) => {
        console.log(data);
        data.object.map((item: any) => {
          item.cap_enf = item.cap_enf ? item.cap_enf : "---";
          item.observaciones = item.observaciones ? item.observaciones : "---";
          item.precio_mant = item.precio_mant ? item.precio_mant : "---";
          item.tecnico = item.tecnico ? item.tecnico : "---";
          item.ult_fecha_mantenimiento = item.ult_fecha_mantenimiento ? moment(item.ult_fecha_mantenimiento).format("YYYY-MM-DD") : "---";
        });
        this.officesList = data.object;
      },
      error: (e) => {
        alert("Ha ocurrido un error");
      }
    });

  }

  closeForm(e: any){
    this.showOfficesForm = false;
    this.showMaintenanceForm = false;
    this.titleForm = "";
    this.dataForm = {};
    this.get();
  }

  private getTableColumn(): tableColumnInterface[] {
    return [
      {
        key: 'num_consultorio',
        title: 'N° Consultorio',
        textAlign: 'center',
        width: "150px"
      },
      {
        key: "observaciones",
        title: "Observaciones",
        width: "200px",
        textAlign: "center"
      },
      {
        key: "ult_fecha_mantenimiento",
        title: "Último mantenimiento",
        textAlign: "center",
        width: "240px"
      },
      {
        key: "actions",
        title: "Acciones",
        width: "100px",
        textAlign: "center"
      }
    ]
  }

}
