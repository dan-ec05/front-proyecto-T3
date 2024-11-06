import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { AuthService } from '../../../auth/services/auth.service';
import { commonResponse } from '../../../shared/interfaces/response.interface';
import { MessageService } from 'primeng/api';
import { SuperadminService } from '../../../shared/services/superadmin.service';

@Component({
  selector: 'delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
  standalone: true,
  imports: [
    DialogModule,
    ReactiveFormsModule,
    NgClass
  ]
})
export class DeleteUserComponent  implements OnInit {

  @Input("show") show: boolean = false;
  @Input("id_user") id_user_to_delete: number = 0;
  @Output("close") showOut: EventEmitter<boolean> = new EventEmitter();

  pass!: FormControl;
  showPass: boolean = false;

  constructor(
    public authService: AuthService,
    public message: MessageService,
    public superAdminService: SuperadminService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.pass = new FormControl("", [Validators.required]);
  }

  save(){
    let username = this.authService._getUserData.usuario;
    let body = {
      pass: this.pass.value,
      username: username
    };
    this.superAdminService.deleteUser(this.id_user_to_delete, body).subscribe({
      next: (data: commonResponse) => {
        if (data.ok && data.object.ok){
          this.message.add({
            severity: "success",
            summary: "Éxito",
            detail: "El usuario se ha eliminado correctamente"
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
          detail: "Ha ocurrido un error al eliminar el usuario"
        });
      }
    });
  }

  closeModal(e: any){
    this.showOut.emit(false);
  }

}
