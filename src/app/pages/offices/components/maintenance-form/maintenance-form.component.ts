import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { AdminService } from '../../../../shared/services/admin.service';
import { commonResponse } from '../../../../shared/interfaces/response.interface';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import moment from 'moment';
import { MessageService } from 'primeng/api';
import { ValidatorsUtils } from '../../../../shared/utils/validators.utils';

@Component({
  selector: 'maintenance-form',
  templateUrl: './maintenance-form.component.html',
  styleUrls: ['./maintenance-form.component.scss'],
  standalone: true,
  imports: [
    DialogModule,
    FormsModule,
    NgClass
  ]
})
export class MaintenanceFormComponent implements OnInit {
  @Input("id") id: any = {};
  @Input("data") data: any = {};
  @Input("show") show: boolean = false;
  @Output("close") showOut: EventEmitter<boolean> = new EventEmitter();

  maintenanceList: any = [];
  last_id!: number;
  currentDate: String = moment().format("YYYY-MM-DD");

  update: boolean = true;

  constructor(
    public adminService: AdminService,
    public message: MessageService,
    public validators: ValidatorsUtils
  ) { }

  ngOnInit() {

    this.get();
  }

  get(){
    this.adminService.getAllMaintenance(this.id).subscribe({
      next: (data: commonResponse) => {
        data.object.forEach((item: any) => {
          item.ult_fecha_mantenimiento = item.ult_fecha_mantenimiento ? moment(item.ult_fecha_mantenimiento).format("YYYY-MM-DD") : '';
        });
        this.last_id = data.object[data.object.length - 1]?.id || 0;
        this.maintenanceList = data.object.filter((item: any) => item.id_consultorio == this.id);
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  add(){

    this.update = false;

    this.last_id += 1;
    
    this.maintenanceList.push({
      id_consultorio: this.id,
      cap_enf: '',
      tecnico: '',
      ult_fecha_mantenimiento: '',
      precio_mant: '',
      id: this.last_id,
      observacion: ''
    });

    
  }

  removeMaintenance(id: number){
    document.getElementById('maintenance_' + id)?.classList.add("animate__fadeOutUp");
    setTimeout(() => {
      this.maintenanceList = this.maintenanceList.filter((item: any) => item.id != id);
    }, 800);

    this.adminService.deleteMaintenance(id).subscribe({
      next: (data: commonResponse) => {
        this.message.add({
          severity: "success",
          summary: "Éxito",
          detail: "El mantenimiento se ha eliminado correctamente"
        });
      },
      error: (e) => {
        console.log(e);
        this.message.add({
          severity: "error",
          summary: "Error",
          detail: "Ha ocurrido un error al eliminar el mantenimiento"
        });
      }
    });
  }

  listValidator(){
    if (this.maintenanceList.length){
      const result = this.maintenanceList.every((item: any) => {
        return item.cap_enf.length && item.tecnico.length && item.ult_fecha_mantenimiento.length && item.precio_mant.length
      });
      return result;
    }
    return false;
  }

  save(){
    if (this.update) this.maintenanceList.forEach((item: any) => item.update = this.update);
    let body = this.maintenanceList;
    this.adminService.addOrUpdateMaintenance(body).subscribe({
      next: (data: commonResponse) => {
        if (data.ok){
          this.message.add({
            severity: "success",
            summary: "Éxito",
            detail: "Los cambios se han guardado correctamente"
          });
        }
      },
      error: (e) => {
        console.log(e);
        this.message.add({
          severity: "error",
          summary: "Error",
          detail: "Ha ocurrido un error al guardar la información"
        });
      }
    });
  }

  closeModal(e: any){
    this.showOut.emit(e);
  }

}
