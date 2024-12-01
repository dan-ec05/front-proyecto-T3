import { NgClass, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { AdminService } from '../../../../shared/services/admin.service';
import { commonResponse } from '../../../../shared/interfaces/response.interface';
import { MessageService } from 'primeng/api';
import { ValidatorsUtils } from '../../../../shared/utils/validators.utils';
import { tooltipComponent } from "../../../../shared/components/tooltip/tooltip.component";

@Component({
  selector: 'form-doctor',
  templateUrl: './form-doctor.component.html',
  styleUrls: ['./form-doctor.component.scss'],
  standalone: true,
  imports: [
    DropdownModule,
    DialogModule,
    ReactiveFormsModule,
    NgClass,
    NgStyle,
    tooltipComponent
]
})
export class FormDoctorComponent  implements OnInit {
	public EMAIL_REGEX: RegExp = /^[a-zA-Z0-9.!#$'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;

  @Input("show") show: boolean = false;
  @Input("data") data: any = {};
  @Input("title") title: String = "";
  @Output("close") close: EventEmitter<boolean> = new EventEmitter();

  form!: FormGroup;
  edited: boolean = false;

  specialismList: any = [];
  addingSpecialism: boolean = false;
  nueva_especialidad: FormControl = new FormControl("", [Validators.required]);

  disabledBtn: any = {
    'cursor': 'not-allowed',
    'color': '#716d6d79'
  };

  screenWidth: any;

  constructor(
    public adminService: AdminService,
    public message: MessageService,
    public validators: ValidatorsUtils
  ) {
    this.screenWidth = window.innerWidth;
  }

  ngOnInit() {
    this.initForm();
    this.getSpecialism();
  }

  addSpecialism(){
    this.addingSpecialism = true;
  }

  saveSpecialism(){
    let body = [];
    let especialidad = this.nueva_especialidad.value;
    console.log(this.specialismList);
    let id = Number(this.specialismList[this.specialismList.length - 1].id) + 1;

    body.push({descripcion: especialidad, id});
    
    this.adminService.addOrUpdateSpecialties(body).subscribe({
      next: (data: commonResponse) => {
        console.log(data);
        if (data.ok && data.object){
          this.message.add({
            severity: "success",
            summary: "Éxito",
            detail: "Especialidad agregada correctamente"
          });

          this.specialismList = [];
          this.addingSpecialism = false;
          this.nueva_especialidad.setValue("");
          this.getSpecialism();
        }
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
  
  getSpecialism(){
    this.adminService.getAllSpecialties().subscribe({
      next: (data: commonResponse) => {
        data.object = data.object.filter((item: any) => item.id != 4)
        this.specialismList = data.object;

        if (Object.keys(this.data).length){
          this.edited = true;
          this.setValues()
        }
      },
      error: (e) => {
        console.log(e);
        this.message.add({
          severity: "error",
          summary: "Error",
          detail: "Ha ocurrido un error al abrir el formulario"
        });
        this.closeModal(false);
      }
    });
  }

  setValues(){
    this.form.patchValue({
      nombre_completo: this.data.nombre_completo,
      cedula: this.data.cedula,
      especialidad: this.specialismList.filter((item: any) => item.id == this.data.id_especialidad)[0],
      num_telefono: this.data.num_telefono,
      correo: this.data.correo
    });
  }

  initForm(){
    this.form = new FormGroup({
      nombre_completo: new FormControl("", Validators.required),
      cedula: new FormControl("", Validators.required),
      especialidad: new FormControl("", [Validators.required]),
      num_telefono: new FormControl("", Validators.required),
      correo: new FormControl("", [Validators.required, Validators.pattern(this.EMAIL_REGEX)])
    });
  }

  closeModal(e: any){
    this.data = {};
    this.close.emit(e);
  }

  save(){
    let body = {
      ...this.form.value
    };

    body.especialidad = this.form.get("especialidad")?.value.id;

    if (this.edited){
      body.id = this.data.id;
      this.adminService.editDoctor(body).subscribe({
        next: (data: commonResponse) => {
          if (data.ok){
            this.message.add({
              severity: "success",
              summary: "Éxito",
              detail: "El médico se ha actualizado correctamente"
            });
          }

          this.closeModal(false);
        },
        error: (e) => {
          console.log(e);
          this.message.add({
            severity: "error",
            summary: "Error",
            detail: "Ha ocurrido un error al actualizar el médico"
          });
        }
      });
    }
    else{
      this.adminService.addNewDoctor(body).subscribe({
        next: (data: commonResponse) => {
          console.log(data);
          this.message.add({
            severity: "success",
            summary: "Éxito",
            detail: "El médico se ha agregado correctamente"
          });
  
          this.closeModal(false);
        },
        error: (e) => {
          console.log(e);
          this.message.add({
            severity: "error",
            summary: "Error",
            detail: "Ha ocurrido un error al agregar el médico"
          });
        }
      });
    }

  }

}
