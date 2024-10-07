import { NgClass, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { tableColumnInterface } from '../../shared/interfaces/table-columns.interface';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';

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
    FormsModule,
    ButtonModule,
    PaymentFormComponent
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
      paidMonth: "Enero",
      amount: "2000 Bs.",
      created_at: "2023-11-05"
    },
    {
      id: 1,
      name: "Ángel María",
      paidMonth: "Marzo",
      amount: "6000 Bs.",
      created_at: "1992-04-18"
    },
    {
      id: 2,
      name: "Mariano Closs",
      paidMonth: "Diciembre",
      amount: "12000 Bs.",
      created_at: "2045-07-29"
    }
  ];

  showPayForm: boolean = false;
  dataForm: any = {};
  titleForm: String = "";

  columns: tableColumnInterface[] = [];

  constructor() { }

  ngOnInit() {
    this.columns = this.getTableColumn();
  }

  showPaymentForm(data: any = {}, title: String){
    this.dataForm = data;
    this.titleForm = title;
    this.showPayForm = true;
  }

  closePaymentForm(event: any){
    console.log(event);
    this.showPayForm = false;
  }

  private getTableColumn(): tableColumnInterface[] {
    return [
      {
        key: 'name',
        title: 'Nombre y apellido',
        width: "100px"
      },
      {
        key: "paidMonth",
        title: "Mes",
        width: "60px",
        textAlign: "center"
      },
      {
        key: "amount",
        title: "Monto",
        width: "150px",
        textAlign: "center"
      },
      {
        key: "created_at",
        title: "Fecha de pago",
        width: "100px",
        textAlign: "center"
      },
      {
        key: "actions",
        title: "Acciones",
        width: "100px",
        textAlign: "center"
      }
    ]
  }

}
