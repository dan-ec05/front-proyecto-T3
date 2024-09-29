import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { tableColumnInterface } from '../../shared/interfaces/table-columns.interface';
import moment from 'moment';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: true,
  imports: [
    TableModule,
    ButtonModule
  ]
})
export class UsersComponent implements OnInit {

  rows: any = [
    {
      email: "danielenrriquecamacho12@gmail.com",
      username: "superadmin",
      full_name: "Daniel Camacho",
      phonenumber: "04126858439",
      created_at: "2024-08-25 16:52:32",
      name_rol: "Super Admin"
    }
  ];

  columns: tableColumnInterface[] = [];

  constructor() { }

  ngOnInit() {
    this.columns = this.getTableColumns();
    this.rows.forEach((row: any) => {
      row.created_at = moment(row.created_at).format("YYYY-MM-DD HH:mm")
      
    });
  }

  newUser(){
    console.log("Nada por ahora");
  }

  private getTableColumns(): tableColumnInterface[]{
    return [
      {
        key: 'email',
        title: "Correo",
        width: "350px",
        textAlign: "center"
      },
      {
        key: "username",
        title: "Usuario",
        width: "100px",
        textAlign: "center"
      },
      {
        key: "full_name",
        title: "Nombre y apellido",
        width: "200px",
        textAlign: "center"
      },
      {
        key: "phonenumber",
        title: "Teléfono",
        width: "150px",
        textAlign: "center"
      },
      {
        key: "created_at",
        title: "Creación",
        width: "200px",
        textAlign: "center"
      },
      {
        key: "name_rol",
        title: "Rol",
        width: "140px",
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
