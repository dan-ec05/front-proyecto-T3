import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../../../shared/services/admin.service';
import { commonResponse } from '../../../../shared/interfaces/response.interface';

@Component({
  selector: 'offices-form',
  templateUrl: './offices-form.component.html',
  styleUrls: ['./offices-form.component.scss'],
  standalone: true,
  imports: [
    DialogModule,
    ReactiveFormsModule,
    NgClass
  ]
})
export class OfficesFormComponent  implements OnInit {
  @Input("data") data: any = {};
  @Input("title") title: String = "";
  @Input("show") show: boolean = false;
  @Output("close") showOut: EventEmitter<boolean> = new EventEmitter();

  form!: FormGroup;
  modifyForm: boolean = false;

  constructor(
    public adminService: AdminService,
    public message: MessageService
  ) {}

  ngOnInit() {
    this.initForm();

    if (Object.keys(this.data).length){
      this.setValues();
    }
  }

  setValues(){
    console.log(this.data);
    this.modifyForm = true;
    this.form.patchValue({
      num_consultorio: this.data.num_consultorio,
      observaciones: this.data.observaciones == "---" ? ""  : this.data.observaciones
    });
  }

  initForm(){
    this.form = new FormGroup({
      num_consultorio: new FormControl("", [Validators.required]),
      observaciones: new FormControl("")
    });
  }

  closeModal(e: any){
    this.showOut.emit(e);
  }

  save(){
    let body = {
      ...this.form.value
    };

    if (this.modifyForm){
      body.id = this.data.id
      this.adminService.editOffice(body).subscribe({
        next: (data: commonResponse) => {
          console.log(data);
          if (data.ok){
            this.message.add({
              severity: "success",
              summary: "Éxito",
              detail: "El consultorio se ha actualizado correctamente"
            });
            this.closeModal(false);
          }
        },
        error: (e) => {
          this.message.add({
            severity: "error",
            summary: "Error",
            detail: "Ha ocurrido un error al actualizar el consultorio"
          });
        }
      });
    }
    else{
      this.adminService.addNewDoctorsOffice(body).subscribe({
        next: (data: commonResponse) => {
          if (data.ok){
            this.message.add({
              severity: "success",
              summary: "Éxito",
              detail: "El consultorio se ha creado correctamente"
            });
            this.closeModal(false);
          }
        },
        error: (e) => {
          console.log(e.error.message)  
          if (e.message){
            this.message.add({
              severity: "error",
              summary: "Error",
              detail: e.error.message.toString().split("Error: ")[1]
            });
            return;
          }
          this.message.add({
            severity: "error",
            summary: "Error",
            detail: "Ha ocurrido un error al crear el consultorio"
          });
        }
      })
    }

  }
}
