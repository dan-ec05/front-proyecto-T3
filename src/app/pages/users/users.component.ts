import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { tableColumnInterface } from '../../shared/interfaces/table-columns.interface';
import moment from 'moment';
import { ButtonModule } from 'primeng/button';
import { UserFormComponent } from './user-form/user-form.component';
import { ToastModule } from 'primeng/toast';
import { SuperadminService } from '../../shared/services/superadmin.service';
import { commonResponse } from '../../shared/interfaces/response.interface';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { tooltipComponent } from '../../shared/components/tooltip/tooltip.component';
import { AuthService } from '../../auth/services/auth.service';
import { UnlockUserComponent } from './unlock-user/unlock-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    UserFormComponent,
    ToastModule,
    ConfirmDialogModule,
    tooltipComponent,
    UnlockUserComponent,
    DeleteUserComponent
  ]
})
export class UsersComponent implements OnInit {

  rolesList: any = [
    {id: 0, name: "Superadmin", value: "superadmin"},
    {id: 1, name: "Admin", value: "admin"},
    {id: 2, name: "Regular", value: "regular"}
  ];

  columns: tableColumnInterface[] = [];
  userList: any = [];

  show: boolean = false;
  dataForm: any = {};
  titleForm: String = "";
  
  unlockUserModal: boolean = false;
  idUserToUnlock: number = 0;

  deleteUserModal: boolean = false;
  idUserToDelete: number = 0;

  constructor(
    private superadminService: SuperadminService,
    public confirmationService: ConfirmationService,
    public message: MessageService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.columns = this.getTableColumns();
    this.get();
  }

  get(){
    this.superadminService.getAllUsers().subscribe({
      next: (data: commonResponse) => {
        console.log(data);
        this.userList = data.object.map((user: any) => {
          return {
            ...user,
            correo: user.correo || "---",
            cargo_formatted: this.rolesList.find((item: any) => item.value == user.cargo).name
          }
        });
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  blockUser(usuario: any){
    this.authService.blockSesion(usuario).subscribe({
      next: (data: commonResponse) => {
        console.log(data);
        this.get();
      },
      error: () => {
        this.message.add({
          severity: "error",
          summary: "Error al bloquear usuario",
          detail: "Ha ocurrido un error al bloquear el usuario"
        })
      }
    })
  }

  unlockUser(id_user: any){
    this.unlockUserModal = true;
    this.idUserToUnlock = id_user;
  }

  deleteUser(id_user: number, e: any){
    console.log(id_user);
    this.deleteUserModal = true;
    this.idUserToDelete = id_user;
  }

  showForm(data: any = {}, title: String = "Crear nuevo usuario", edit: boolean = false, onlyShow: boolean = false){
    this.dataForm = data;
    this.dataForm.editUser = edit;
    this.dataForm.onlyShow = onlyShow;
    this.titleForm = title;
    this.show = true;
  }

  closeForm(e: any){
    this.show = false;
    this.unlockUserModal = false;
    this.deleteUserModal = false;
    this.get();
  }

  private getTableColumns(): tableColumnInterface[]{
    return [
      {
        key: 'correo',
        title: "Correo",
        width: "350px",
        textAlign: "center"
      },
      {
        key: "nombre",
        title: "Nombre",
        width: "350px",
        textAlign: "center"
      },
      {
        key: "cargo_formatted",
        title: "Rol",
        width: "150px",
        textAlign: "center"
      },
      {
        key: "actions",
        title: "Acciones",
        width: "150px",
        textAlign: "center"
      }
    ];
  }

}
