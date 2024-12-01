import { Component, OnInit } from '@angular/core';
import { SuperadminService } from '../../shared/services/superadmin.service';
import { commonResponse } from '../../shared/interfaces/response.interface';
import { tableColumnInterface } from '../../shared/interfaces/table-columns.interface';
import moment from 'moment';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-logbook',
  templateUrl: './logbook.component.html',
  styleUrls: ['./logbook.component.scss'],
  standalone: true,
  imports: [
    TableModule
  ]
})
export class LogbookComponent  implements OnInit {

  columns: any;
  logbookList: any = [];

  constructor(
    public superAdminService: SuperadminService
  ) { }

  ngOnInit() {
    this.columns = this.getTableColumn();
    this.get();
  } 

  get(){
    this.superAdminService.getAllLogbook().subscribe({
      next: (data: commonResponse) => {
        console.log(data);
        this.logbookList = data.object.map((item: any) => {
          item.fecha_formatted = moment(item.fecha).subtract(4, "hours").format("YYYY-MM-DD LTS");
          item.cargo_formatted = item.cargo.toUpperCase();

          return item;
        })
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  getTableColumn(): tableColumnInterface[] {
    return [
      {
        key: "usuario",
        title: "Usuario",
        textAlign: "center",
        width: "150px"
      },
      {
        key: "cargo_formatted",
        title: "Rol",
        textAlign: "center",
        width: "150px"
      },
      {
        key: "accion",
        title: "Acción",
        textAlign: "center",
        width: "300px"
      },
      {
        key: "fecha_formatted",
        title: "Fecha",
        textAlign: "center",
        width: "200px"
      }
    ]
  }

}
