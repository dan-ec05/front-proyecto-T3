import { NgClass, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { tableColumnInterface } from '../../shared/interfaces/table-columns.interface';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-management',
  templateUrl: './payment-management.component.html',
  styleUrls: ['./payment-management.component.scss'],
  standalone: true,
  imports: [
    TableModule,
    NgClass,
    NgStyle,
    DropdownModule,
    FormsModule
  ]
})
export class PaymentManagementComponent  implements OnInit {

  yearSelected: number | any = 2024;

  yearsSelect: any = [
    { id: 0, year: 2010 },
    { id: 1, year: 2011 },
    { id: 2, year: 2012 },
    { id: 3, year: 2013 },
    { id: 4, year: 2014 },
    { id: 5, year: 2015 },
    { id: 6, year: 2016 },
    { id: 7, year: 2017 },
    { id: 8, year: 2018 },
    { id: 9, year: 2019 },
    { id: 10, year: 2020 },
    { id: 11, year: 2022 },
    { id: 12, year: 2023 },
    { id: 13, year: 2024 },

  ]

  exampleDataTable: any = [
    {
      id: 0,
      name: "Juan Riquelme",
      months: {
        january: true,
        february: true,
        march: false,
        april: false,
        may: true,
        june: true,
        july: false,
        august: false,
        september: true,
        october: true,
        november: true,
        december: false
      },
      amount: "2000 Bs.",
      schedule: {
        work: "TODOS LOS DÍAS"
      }
    },
    {
      id: 1,
      name: "Ángel María",
      months: {
        january: false,
        february: true,
        march: false,
        april: false,
        may: true,
        june: true,
        july: false,
        august: false,
        september: true,
        october: true,
        november: true,
        december: false
      },
      amount: "6000 Bs.",
      schedule: {
        work: "LUNES - JUEVES"
      }
    },
    {
      id: 2,
      name: "Mariano Closs",
      months: {
        january: true,
        february: true,
        march: true,
        april: false,
        may: true,
        june: true,
        july: false,
        august: false,
        september: true,
        october: true,
        november: true,
        december: false
      },
      amount: "12000 Bs.",
      schedule: {
        work: "LUNES - VIERNES"
      }
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
        key: 'name',
        title: 'Nombre y apellido',
        width: "180px"
      },
      {
        key: 'january',
        title: 'E.',
        width: "70px",
        textAlign: "center"
      },
      {
        key: 'february',
        title: 'F.',
        width: "70px",
        textAlign: "center"
      },
      {
        key: 'march',
        title: 'M.',
        width: "70px",
        textAlign: "center"
      },
      {
        key: 'april',
        title: 'A.',
        width: "70px",
        textAlign: "center"
      },
      {
        key: 'may',
        title: 'M.',
        width: "70px",
        textAlign: "center"
      },
      {
        key: 'june',
        title: 'J.',
        width: "70px",
        textAlign: "center"
      },
      {
        key: 'july',
        title: 'J.',
        width: "70px",
        textAlign: "center"
      },
      {
        key: 'august',
        title: 'A.',
        width: "70px",
        textAlign: "center"
      },
      {
        key: 'september',
        title: 'S.',
        width: "70px",
        textAlign: "center"
      },
      {
        key: 'october',
        title: 'O.',
        width: "70px",
        textAlign: "center"
      },
      {
        key: 'november',
        title: 'N.',
        width: "70px",
        textAlign: "center"
      },
      {
        key: 'december',
        title: 'D.',
        width: "70px",
        textAlign: "center"
      },
      {
        key: "amount",
        title: "Monto",
        width: "120px",
        textAlign: "center"
      },
      {
        key: "schedule",
        title: "Horario",
        width: "200px",
        textAlign: "center"
      }
    ]
  }

}
