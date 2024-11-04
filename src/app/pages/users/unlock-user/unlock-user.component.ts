import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { AuthService } from '../../../auth/services/auth.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { commonResponse } from '../../../shared/interfaces/response.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'unlock-user',
  templateUrl: './unlock-user.component.html',
  styleUrls: ['./unlock-user.component.scss'],
  standalone: true,
  imports: [
    DialogModule,
    NgClass,
    ReactiveFormsModule
  ]
})
export class UnlockUserComponent  implements OnInit {
  @Input("show") show: boolean = false;
  @Input("id_user_to_unlock") id_user_to_unlock: number = 0;

  @Output("close") close: EventEmitter<any> = new EventEmitter();

  showPass: boolean = false;
  pass!: FormControl;

  constructor(
    public authService: AuthService,
    public message: MessageService
  ) { }

  ngOnInit() {
    // console.log(this.id_user_to_unlock);
    this.initInput();
  }

  initInput(){
    this.pass = new FormControl("", [Validators.required]);
  }

  closeModal(e: any){
    this.close.emit(e);
  }

  save(){
    let username = this.authService._getUserData.usuario;
    let body = {
      password: this.pass.value,
      username: username
    };
    this.authService.unlockUser(this.id_user_to_unlock, body).subscribe({
      next: (data: commonResponse) => {
        if (data.ok && data.object.ok){
          this.message.add({
            severity: "success",
            summary: "Éxito",
            detail: "El usuario se ha desbloqueado correctamente"
          });
          this.closeModal(false);
        }
        else{
          this.message.add({
            severity: "error",
            summary: "Error",
            detail: "Contraseña incorrecta"
          });
        }
      },
      error: () => {
        this.message.add({
          severity: "error",
          summary: "Error",
          detail: "Ha ocurrido un error al desbloquear el usuario"
        });
      }
    });
  }

}
