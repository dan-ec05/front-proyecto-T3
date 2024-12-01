import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { NgClass, NgStyle } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import {ToastModule} from "primeng/toast";
import { commonResponse } from '../../../shared/interfaces/response.interface';
import { LoaderButtonComponent } from '../../../shared/components/loader-button/loader-button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule, 
    MatButtonModule, 
    NgClass,
    RouterModule,
    ReactiveFormsModule,
    ToastModule,
    FormsModule,
    NgStyle,
    LoaderButtonComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  passwordForm!: FormGroup;
  hide: boolean = true;

  forgotPassStep: boolean = false;
  questionStep: number = 0;
  questionStepInfo: any = {};
  answer: any = "";

  code: any = "";
  emailStep: number = 0;
  emailStepInfo: any = {};
  username: string = "";

  showPass: boolean = false;
  showPassRpted: boolean = false;
  samePasswords: boolean = false;
  passwordValid: boolean = false;
  passwordError: String = "";

  n_tries: number;

  constructor(
    private authService: AuthService,
    private router: Router,
    private message: MessageService
  ){
    this.n_tries = Number(localStorage.getItem("n_intentos_login_fallido"));
  }

  ngOnInit(): void {
    this.initForm();
  }

  recoveryPassword(option: number){
    if (option == 1){
      this.questionStep = 1;
      return;
    }
    else{
      this.emailStep = 1;
      return;
    }
  }

  sendUsernameEmailStep(){
    this.authService.sendCodeByUsername(this.username).subscribe({
      next: (data: commonResponse) => {
        console.log(data);
        if (data.ok){
          this.emailStep = 2;
          this.emailStepInfo = data.object;
          return;
        }
        else{
          this.message.add({
            severity: "error",
            summary: "Usuario no encontrado",
            detail: "Nombre de usuario incorrecto"
          });
        }
      },
      error: (e) => {
        console.log(e);
        this.message.add({
          severity: "error",
          summary: "Error",
          detail: "Error al enviar el correo con el código"
        });
      }
    });
  }

  sendUsername(){
    this.authService.getSecurityQuestion(this.username).subscribe({
      next: (data: commonResponse) => {
        console.log(data);
        if (!(data.object.length)){
          this.message.add({
            severity: "error",
            summary: "Usuario no encontrado",
            detail: "Nombre de usuario incorrecto"
          });
          return;
        }
        this.questionStep = 2;
        this.questionStepInfo = data.object[0];
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  checkCode(){
    let body = {
      id: this.emailStepInfo.id,
      code: this.code
    };

    this.authService.checkCode(body).subscribe({
      next: (data: commonResponse) => {
        console.log(data);
        if (data.ok){
          this.emailStep = 3;
          return;
        }
        else{
          this.message.add({
            severity: "error",
            summary: "Código incorrecto",
            detail: "El código introducido es incorrecto"
          });
        }
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  checkAnswer(){
    let body = {
      id_user: this.questionStepInfo.user_id,
      answer: this.answer
    };
    this.authService.checkAnswer(body).subscribe({
      next: (data: commonResponse) => {
        console.log(data);
        if (!(data.object.length)){
          this.message.add({
            severity: "error",
            summary: "Respuesta incorrecta",
            detail: "La respuesta introducida es incorrecta"
          });
          return;
        }
        this.questionStep = 3;

      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  updatePassword(emailStep: boolean = false){
    let body = {
      password: this.passwordForm.get("pass")?.value,
      id_user: this.questionStepInfo.user_id
    };

    if (emailStep){
      body.id_user = this.emailStepInfo.id
    }

    this.authService.updatePassword(body).subscribe({
      next: (data: commonResponse) => {
        console.log(data);
        if (data.ok && data.object){
          this.message.add({
            severity: "success",
            summary: "Contraseña actualizada",
            detail: "La contraseña se ha actualizado correctamente"
          });

          this.forgotPassStep = false;
        }
      },
      error: (e) => {
        this.message.add({
          severity: "error",
          summary: "Error",
          detail: "Ha ocurrido un error al intentar actualizar la contraseña"
        });
      }
    });
  }

  focusPassword(focus: boolean, index: number = 0){
    const div = document.getElementsByClassName("form-control--password")[index];
    if (focus) div.classList.add("form-control-active");
    else div.classList.remove("form-control-active");
  }

  checkPasswords(){
    let pass = this.passwordForm.get("pass")?.value;
    let repeat_pass = this.passwordForm.get("pass_rpted")?.value;

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

    const _value = this.passwordForm.get('pass')?.value.trim();

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

  backToLogin(){
    this.forgotPassStep = false;
    this.emailStep = 0;
    this.questionStep = 0;
    this.emailStepInfo = {};
    this.questionStepInfo = {};
  }

  login(){
    let data = {
      username: this.loginForm.get("username")?.value,
      password: this.loginForm.get("password")?.value
    }

    this.authService.login(data).subscribe({
      next: (res: commonResponse) => {
        if (res.object && res.ok){
          localStorage.setItem("n_intentos_login_fallido", String(0));
          this.authService.setUserData(res.object);
          this.router.navigateByUrl("/inicio");
        }
      }, 
      error: (error) => {
        console.log(error);
        if (error.error?.estado == 0){
          this.message.add({
            severity: "error",
            summary: "Sesión bloqueada",
            detail: "Solicitar desbloqueo a soporte"
          });
          return;
        }

        if (this.n_tries >= 2){
          this.authService.blockSesion(this.loginForm.get("username")?.value).subscribe({
            next: () => {
              this.message.add({
                severity: "error",
                summary: "Se ha bloqueado la sesión",
                detail: "Solicitar desbloqueo a soporte"
              });
            },
            error: () => {}
          });
          return;
        }

        if (!(error.ok) && error.error.error){
          this.message.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error + String(this.n_tries >= 1 ? `. Quedan ${2 - this.n_tries} intentos restantes.` : ''),
          });
          this.n_tries += 1;
          localStorage.setItem("n_intentos_login_fallido", String(this.n_tries));
          return;
        }

        this.message.add({
          severity: "error",
          summary: "Error",
          detail: "Error al iniciar sesión"
        });
        return;
      }
    }
  );
  }

  initForm(){
    this.loginForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });

    this.passwordForm = new FormGroup({
      pass: new FormControl("", Validators.required),
      pass_rpted: new FormControl("", Validators.required)
    })
  }
}
