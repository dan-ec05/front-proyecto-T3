import { Component, OnInit } from '@angular/core';
import { tableColumnInterface } from '../../shared/interfaces/table-columns.interface';
import { TableModule } from 'primeng/table';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss'],
  standalone: true,
  imports: [
    TableModule,
    NgClass
  ]
})
export class DoctorsComponent  implements OnInit {

  exampleDataTable: any = [
    {
      id_consultory: 1,
      full_name: "Enrique Iglesias",
      dni: "999-999-222",
      main: "Pediatría",
      schedule: "7:00AM - 11:00AM",
      status: "EXCLUSIVO"
    },
    {
      id_consultory: 2,
      full_name: "Marc Anthony",
      dni: "666-102-122",
      main: "Médico Cirujano",
      schedule: "10:00AM - 5:00PM",
      status: "EXCLUSIVO"
    },
    {
      id_consultory: 3,
      full_name: "Cris Valencia",
      dni: "111-222-333",
      main: "Ginecología",
      schedule: "9:00AM - 11:00AM",
      status: "EXCLUSIVO"
    },
    {
      id_consultory: 4,
      full_name: "Nathan Drake",
      dni: "293-238-233",
      main: "Estética",
      schedule: "5:00AM - 8:00PM",
      status: "EXCLUSIVO"
    }
  ];

  columns: tableColumnInterface[] = [];

  constructor() { }

  ngOnInit() {
    this.columns = this.getTableColumn();
  }

  private getTableColumn(): tableColumnInterface[] {
    return [
      {
        key: 'id_consultory',
        title: "N° consultorio",
        textAlign: "center"
      },
      {
        key: "full_name",
        title: "Nombre y apellido",
        textAlign: "center"
      },
      {
        key: "dni",
        title: "Cédula",
        textAlign: "center"
      },
      {
        key: "main",
        title: "Especialidad",
        textAlign: "center"
      },
      {
        key: "schedule",
        title: "Horario",
        textAlign: "center"
      },
      {
        key: "status",
        title: "Condición",
        textAlign: "center"
      }
    ]
  }

}
