import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { NgClass } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { loginResponse } from '../../interfaces/auth.interface';
import { MessageService } from 'primeng/api';
import {ToastModule} from "primeng/toast";

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

  constructor(
    private authService: AuthService,
    private router: Router,
    private message: MessageService
  ){}

  ngOnInit(): void {
    this.initForm();
  }

  login(){
    let data = {
      username: this.loginForm.get("username")?.value,
      password: this.loginForm.get("password")?.value
    }

    this.authService.login(data).subscribe({
      next: (res: loginResponse) => {
        if (res.token || res.ok){
          res.userData!.name_rol = res.userData?.name;
          this.authService.setUserData(res.userData);
          this.message.add({
            severity: "success",
            summary: "Sesión iniciada",
            detail: "Se le redigirá a la página de inicio en unos segundos..."
          })
          setTimeout(() => {
            this.router.navigateByUrl("/inicio");
          }, 3000);

        }
      }, 
    error: (error) => {
      if (!(error.ok) && error.error.error){
        this.message.add({
          severity: "error",
          summary: "Error",
          detail: error.error.error,
        });
      }
      else{
        this.message.add({
          severity: "error",
          summary: "Error",
          detail: "Error al iniciar sesión"
        });
      }
    }});
  }

  initForm(){
    this.loginForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });
  }
}
