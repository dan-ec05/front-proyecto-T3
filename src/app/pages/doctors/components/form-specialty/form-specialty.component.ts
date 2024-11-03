import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { AdminService } from '../../../../shared/services/admin.service';
import { commonResponse } from '../../../../shared/interfaces/response.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'form-specialty',
  templateUrl: './form-specialty.component.html',
  styleUrls: ['./form-specialty.component.scss'],
  standalone: true,
  imports: [
    DialogModule,
    NgClass,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class FormSpecialtyComponent  implements OnInit {
  @Input("show") show: boolean = false;
  @Input("title") title: String = "";
  @Output("close") close: EventEmitter<boolean> = new EventEmitter();

  list: Array<any> = [];
  last_id!: number;

  constructor(
    public adminService: AdminService,
    public message: MessageService
  ) { }

  ngOnInit() {
    this.get();
  }

  get(){
    this.adminService.getAllSpecialties().subscribe({
      next: (data: commonResponse) => {
        console.log(data);
        data.object = data.object.filter((item: any) => item.id != 4)
        this.list = data.object;
        this.last_id = this.list[this.list.length - 1]?.id || 1;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  addSpecialty(){
    this.last_id += 1;
    if (this.last_id == 4) this.last_id += 1;
    this.list.push({
      id: this.last_id,
      descripcion: ""
    });
  }

  removeSpecialty(id: Number){
    document.getElementById('specialty_' + id)?.classList.add("animate__fadeOutUp");
    setTimeout(() => {
      this.list = this.list.filter(item => item.id != id);
    }, 800);

    this.adminService.deleteSpecialty(id).subscribe({
      next: (data: commonResponse) => {
        this.message.add({
          severity: "success",
          summary: "Éxito",
          detail: "La especialidad se ha eliminado correctamente"
        });
      },
      error: (e) => {
        console.log(e);
        this.message.add({
          severity: "error",
          summary: "Error",
          detail: "Ha ocurrido un error al eliminar la especialidad"
        });
      }
    })
  }

  listValidator(){
    if (this.list.length && this.list.every(item => item.descripcion)){
      return true;
    }
    return false;
  }

  save(){
    let body = this.list;

    this.adminService.addOrUpdateSpecialties(body).subscribe({
      next: (data: commonResponse) => {
        if (data.ok){
          this.message.add({
            severity: "success",
            summary: "Éxito",
            detail: "Los cambios se han guardado correctamente"
          });
        }

        this.closeModal(false);
      },
      error: (error) => {
        this.message.add({
          severity: "error",
          summary: "Error",
          detail: "Ha ocurrido un error al guardar los cambios"
        });
      }
    })
  }

  closeModal(e: any){
    this.close.emit(false);
  }

}
