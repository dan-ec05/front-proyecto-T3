import { NgClass, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { tableColumnInterface } from '../../shared/interfaces/table-columns.interface';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { ToastModule } from 'primeng/toast';
import { AdminService } from '../../shared/services/admin.service';
import { commonResponse } from '../../shared/interfaces/response.interface';
import moment from 'moment';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { tooltipComponent } from '../../shared/components/tooltip/tooltip.component';
import { ValidatorsUtils } from '../../shared/utils/validators.utils';

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
    PaymentFormComponent,
    ToastModule,
    ConfirmDialogModule,
    tooltipComponent
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

  ];

  paymentsList: any = [];

  showPayForm: boolean = false;
  dataForm: any = {};
  titleForm: String = "";

  columns: tableColumnInterface[] = [];

  constructor(
    public adminService: AdminService,
    public confirmationService: ConfirmationService,
    public message: MessageService,
    private validatorsUtils: ValidatorsUtils
  ) { }

  ngOnInit() {
    this.columns = this.getTableColumn();
    this.get();
  }

  get(){
    this.adminService.getAllPayments().subscribe({
      next: (data: commonResponse) => {
        data.object.forEach((item: any) => {
          item.fecha_corte_formatted = moment(item.fecha_corte).format("YYYY-MM-DD");
          item.fecha_pago_formatted = moment(item.fecha_pago).format("YYYY-MM-DD");
          item.monto = item.monto + "$";
          item.hora_inicio_formatted = this.validatorsUtils.timeConversorToAM(item.hora_inicio);
          item.hora_fin_formatted = this.validatorsUtils.timeConversorToAM(item.hora_fin);
          item.abono_formatted = Boolean(Number(item.restante));
          item.condicion_formatted = `(${item.condicion != 'not_used' ? item.condicion : 'SU'}) ${item.condicion == 'M' ? 'Mañana' : item.condicion == 'T' ? 'Tarde' : item.condicion == 'E' ? 'Exclusivo' : 'Sin uso'}`
        });
        this.paymentsList = data.object;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  deletePayment(
    id: Number,
    id_cm: Number,
    e: any
  ){
    this.confirmationService.confirm({
      target: e.target as EventTarget,
      message: "¿Estás seguro de borrar el pago?",
      header: "Eliminar pago",
      icon: 'pi pi-exclamation-circle',
      rejectButtonStyleClass: "btn-reject",
      acceptButtonStyleClass: "btn-acept",
      acceptLabel: "Aceptar",
      rejectLabel: "Cancelar",
      accept: () =>{
        this.adminService.deletePayment(id, id_cm).subscribe({
          next: (data: commonResponse) => {
            this.message.add({
              severity: "success",
              summary: "Éxito",
              detail: "El pago se ha eliminado correctamente"
            });
            this.get();
          },
          error: (e) => {
            console.log(e);
            this.message.add({
              severity: "error",
              summary: "Error",
              detail: "Ha ocurrido un error al eliminar el pago"
            });
          }
        })
      },
      
    })
  }

  showPaymentForm(data: any = {}, title: String){
    this.dataForm = data;
    this.titleForm = title;
    this.showPayForm = true;
  }

  closePaymentForm(event: any){
    this.showPayForm = false;
    this.get();
  }

  private getTableColumn(): tableColumnInterface[] {
    return [
      {
        key: 'num_consultorio',
        title: 'N° Consultorio',
        width: "150px",
        textAlign: 'center'
      },
      {
        key: "nombre_medico",
        title: "Médico",
        width: "200px",
        textAlign: "center"
      },
      {
        key: "condicion_formatted",
        title: "Horario",
        width: "150px",
        textAlign: "center"
      },
      {
        key: "fecha_corte_formatted",
        title: "Fecha de corte",
        width: "150px",
        textAlign: "center"
      },
      {
        key: "fecha_pago_formatted",
        title: "Fecha de pago",
        width: "150px",
        textAlign: "center"
      },
      {
        key: "monto",
        title: "Monto",
        width: "100px",
        textAlign: "center"
      },
      {
        key: "abono_formatted",
        title: "Tipo de pago",
        width: "150px",
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
