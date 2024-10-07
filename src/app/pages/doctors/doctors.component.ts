import { Component, OnInit } from '@angular/core';
import { tableColumnInterface } from '../../shared/interfaces/table-columns.interface';
import { TableModule } from 'primeng/table';
import { NgClass } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormDoctorComponent } from './form-doctor/form-doctor.component';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss'],
  standalone: true,
  imports: [
    TableModule,
    NgClass,
    ButtonModule,
    FormDoctorComponent  
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

  showFormDoctor: boolean = false;
  dataForm: any = {};
  titleForm: String = "Crear médico";

  columns: tableColumnInterface[] = [];

  constructor() { }

  ngOnInit() {
    this.columns = this.getTableColumn();
  }

  showForm(data: any, title: String){
    console.log(data);
    this.dataForm = data;
    this.titleForm = title;
    this.showFormDoctor = true;
  }

  closeForm(e: any){
    this.dataForm = {};
    this.showFormDoctor = false;
  }

  private getTableColumn(): tableColumnInterface[] {
    return [
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
        key: 'actions',
        title: "Acciones",
        textAlign: 'center'
      }
    ]
  }

}
