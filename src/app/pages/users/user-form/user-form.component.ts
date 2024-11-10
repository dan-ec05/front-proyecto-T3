import { NgClass, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButton, SelectButtonModule } from 'primeng/selectbutton';
import { SuperadminService } from '../../../shared/services/superadmin.service';
import { commonResponse } from '../../../shared/interfaces/response.interface';
import { MessageService } from 'primeng/api';
import { ValidatorsUtils } from '../../../shared/utils/validators.utils';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  standalone: true,
  imports: [
    DialogModule,
    DropdownModule,
    ReactiveFormsModule,
    NgClass,
    SelectButtonModule,
    NgStyle
  ]
})
export class UserFormComponent implements OnInit{
	public EMAIL_REGEX: RegExp = /^[a-zA-Z0-9.!#$'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
  
  @Input("show") show: boolean = false;
  @Input("title") title: String = "";
  @Input("data") data: any = {};

  @Output("close") close: EventEmitter<any> = new EventEmitter();

  rolesList: any = [
    {id: 0, name: "Superadmin", value: "superadmin"},
    {id: 1, name: "Admin", value: "admin"},
    // {id: 2, name: "Regular", value: "regular"}
  ];
  securityQList: any = [];

  form!: FormGroup;
  securityForm!: FormGroup;
  nextStep: boolean = false;
  cargo_usuario: String = "";

  onlyShow: boolean = false;
  showSecurity: boolean = true;

  editValues: boolean = false;
  setNewPassword: boolean = false;

  showPass: boolean = false;
  showPassRpted: boolean = false;
  samePasswords: boolean = false;
  passwordValid: boolean = false;
  passwordError: String = "";

  constructor(
    private superadminService: SuperadminService,
    public message: MessageService,
    public validators: ValidatorsUtils
  ) { }

  ngOnInit() {
    this.initForm();
    this.get();

  }

  get(){
    this.superadminService.getAllSecurityQ().subscribe({
      next: (data: commonResponse) => {
        this.securityQList = data.object;

        if(this.data.id != undefined){
          this.setValue();
          this.editValues = this.data.editUser;
          this.onlyShow = this.data.onlyShow;
          this.passwordValid = true;
          this.samePasswords = true;
          this.showSecurity = this.data.showSecurity != undefined ? this.data.showSecurity : true;

        }
      },
      error: (e) => {
        alert("Error");
      }
    });
  }

  focusPassword(focus: boolean, index: number = 0){
    const div = document.getElementsByClassName("form-control--password")[index];
    if (focus) div.classList.add("form-control-active");
    else div.classList.remove("form-control-active");
  }

  initForm(){
    this.form = new FormGroup({
      correo: new FormControl("", [Validators.required, Validators.pattern(this.EMAIL_REGEX)]),
      usuario: new FormControl("", Validators.required),
      nombre: new FormControl("", Validators.required),
      cargo: new FormControl("", Validators.required)
    });

    this.securityForm = new FormGroup({
      id_pregunta_seguridad: new FormControl("", Validators.required),
      respuesta: new FormControl("", Validators.required),
      pass: new FormControl("", Validators.required),
      pass_rpted: new FormControl("", Validators.required)
    });
  }

  checkPasswords(){
    let pass = this.securityForm.get("pass")?.value;
    let repeat_pass = this.securityForm.get("pass_rpted")?.value;

    if (String(pass) == String(repeat_pass)){
      this.samePasswords = true;
      return;
    }
    else{
      this.samePasswords = false;
      return;
    }
  }

  validatePassword(){
    this.passwordError = "";
    this.passwordValid = false;

    const _value = this.securityForm.get('pass')?.value.trim();

    if (_value.length >= 16 && _value.length <= 24) {
      if (!(/[A-Z]/.test(_value))) {
        this.passwordError = "Mínimo una letra en mayúscula";
        return;
      } 
  
      if (!(/[a-z]/.test(_value))) {
        this.passwordError = "Mínimo una letra en minúscula";
        return;
      } 
  
      if (!(/[0-9]/.test(_value))) {
        this.passwordError = "Mínimo un número";
        return;
      }
    } else {
      this.passwordError = _value.length < 16 ? "Mín 16 carácteres" : _value.length > 24 ? "Máx 16 carácteres" : "";
      return;
    }

    this.passwordError = "";
    this.passwordValid = true;
  }

  setValue(){
    this.form.patchValue({
      correo: this.data.correo,
      usuario: this.data.usuario,
      nombre: this.data.nombre,
      cargo: this.data.cargo
    });

    this.securityForm.patchValue({
      id_pregunta_seguridad: this.securityQList.find((item: any) => item.id == this.data.id_pregunta_seguridad),
      respuesta: this.data.respuesta_seguridad,
      pass: this.data.contraseña,
      pass_rpted: this.data.contraseña
    });

    this.cargo_usuario = this.rolesList.find((item: any) => item.value == this.form.get("cargo")?.value).name;
  }

  modifyPassword(){
    this.setNewPassword = true;
    this.securityForm.patchValue({
      pass: "",
      pass_rpted: ""
    });

    this.passwordValid = true;
    this.samePasswords = true;
  }

  next(){
    if (!this.nextStep){
      this.title = "Seguridad";
      this.nextStep = true;
    }
  }

  changeRole(e: any){
    console.log(e);
    this.form.patchValue({
      cargo: e.value.value || e.value
    });
  }

  changeQuestion(e: any){
    this.securityForm.patchValue({
      id_pregunta_seguridad: e.value
    });
  }

  back(){
    this.title = "Crear nuevo usuario";
    this.nextStep = false;
  }

  save(){
    let body = {
      ...this.form.value,
      ...this.securityForm.value,
    };

    body.id_pregunta_seguridad = body.id_pregunta_seguridad.id

    if (this.editValues){
      body.id = this.data.id;
      this.superadminService.updateUser(body).subscribe({
        next: (data: commonResponse) => {
          if (data.ok){
            this.message.add({
              severity: "success",
              summary: "Éxito",
              detail: "El usuario se ha actualizado correctamente"
            });

            this.closeModal(false);
          }
        },
        error: (e) => {
          console.log(e);
          this.message.add({
            severity: "error",
            summary: "Error",
            detail: "Ha ocurrido un error al actualizar el usuario"
          });
        }
      });
    }
    else{
      this.superadminService.addNewUser(body).subscribe({
        next: (data: commonResponse) => {
          console.log(data);
          if (data.ok){
            this.message.add({
              severity: "success",
              summary: "Éxito",
              detail: "El usuario se ha creado correctamente"
            });

            this.closeModal(false);
          }
        },
        error: (e) => {
          console.log(e);
          this.message.add({
            severity: "error",
            summary: "Error",
            detail: "Ha ocurrido un error al crear el usuario"
          });
        }
      });
    }
  }

  closeModal(e: any){
    this.close.emit(e);
  }

}
