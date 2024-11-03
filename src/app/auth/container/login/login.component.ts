import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { NgClass } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import {ToastModule} from "primeng/toast";
import { commonResponse } from '../../../shared/interfaces/response.interface';

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
    ToastModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  hide: boolean = true;

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

  login(){
    if (false){
      this.message.add({
        severity: "error",
        summary: "Sesión bloqueada",
        detail: "Espere 5 minutos para seguir intentando"
      });
    }
    else{
      let data = {
        username: this.loginForm.get("username")?.value,
        password: this.loginForm.get("password")?.value
      }
  
      this.authService.login(data).subscribe({
        next: (res: commonResponse) => {
          if (res.object && res.ok){
            this.authService.setUserData(res.object);
            this.router.navigateByUrl("/inicio");
          }
        }, 
        error: (error) => {
          console.log(error);
          this.n_tries += 1;
          localStorage.setItem("n_intentos_login_fallido", String(this.n_tries));
          if (!(error.ok) && error.error.error){
            this.message.add({
              severity: "error",
              summary: "Error",
              detail: error.error.error + String(this.n_tries > 2 ? `. Quedan ${5 - this.n_tries} intentos restantes.` : ''),
            });
          }
          else{
            this.message.add({
              severity: "error",
              summary: "Error",
              detail: "Error al iniciar sesión"
            });
          }
        }
      }
    );
    }
  }

  initForm(){
    this.loginForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });
  }
}
