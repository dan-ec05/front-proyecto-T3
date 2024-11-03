import { NgClass, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import moment from 'moment';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { AdminService } from '../../../../shared/services/admin.service';
import { commonResponse } from '../../../../shared/interfaces/response.interface';
import { MessageService } from 'primeng/api';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
  standalone: true,
  imports: [
    DialogModule,
    DropdownModule,
    InputNumberModule,
    ReactiveFormsModule,
    NgClass,
    NgStyle,
    SelectButtonModule
  ]
})
export class PaymentFormComponent  implements OnInit {
  @Input("data") data: any = {};
  @Input("title") title: String = "";
  @Input("show") show: boolean = false;
  @Output("close") showOut: EventEmitter<boolean | any> = new EventEmitter();

  doctorsList: any = [
    {id: 0, name: "Cris Valencia"},
    {id: 1, name: "Maria Antonieta"},
    {id: 2, name: "Jake Colina"},
    {id: 3, name: "Nathan Drake"},
    {id: 4, name: "Joel Soto"},
    {id: 5, name: "Pablo Polar"},
    {id: 6, name: "Jesús Gozo"},
    {id: 7, name: "Juan Riquelme"},
    {id: 8, name: "Ángel María"},
    {id: 9, name: "Mariano Closs"}
  ];

  monthsList: any = [
    {id: 0, name: "Enero"},
    {id: 1, name: "Febrero"},
    {id: 2, name: "Marzo"},
    {id: 3, name: "Abril"},
    {id: 4, name: "Mayo"},
    {id: 5, name: "Junio"},
    {id: 6, name: "Julio"},
    {id: 7, name: "Agosto"},
    {id: 8, name: "Septiembre"},
    {id: 9, name: "Octubre"},
    {id: 10, name: "Noviembre"},
    {id: 11, name: "Diciembre"},
  ];

  form!: FormGroup;
  updateForm: boolean = false;

  dateToday: String = moment().format("YYYY-MM-DD");
  schedulesList: any = [];

  allSchedules: any = [];
  typePayment: any = [
    {id: 1, name: "Completo"},
    {id: 2, name: "Abono"}
  ];

  constructor(
    public adminService: AdminService,
    public message: MessageService
  ) { }
  
  ngOnInit() {
    this.initForm();
    this.get();
  }

  initForm(){
    this.form = new FormGroup({
      horario: new FormControl("", Validators.required),
      fecha_corte: new FormControl(moment().format("YYYY-MM-DD"), Validators.required),
      fecha_pago: new FormControl(moment().format("YYYY-MM-DD"), Validators.required),
      monto: new FormControl("", Validators.required),
      solvente: new FormControl("", [Validators.required])
    });
  }

  get(){
    this.adminService.getAllSchedules().subscribe({
      next: (data: commonResponse) => {
        data.object.forEach((item: any) => {
          item.name = `Consultorio ${item.num_consultorio} - ${item.nombre_completo}`;
        });

        this.allSchedules = data.object;

        this.schedulesList = data.object.filter((item: any) => !(item.solvente));

        if(this.data.id != undefined){
          this.setValues();
        }
      },
      error: () => {}
    });
  }

  setValues(){
    this.updateForm = true;

    this.form.patchValue({
      horario: this.allSchedules.filter((item: any) => item.id == this.data.id_consultorios_medicos)[0],
      fecha_corte: this.data.fecha_corte_formatted,
      fecha_pago: this.data.fecha_pago_formatted,
      monto: Number(this.data.monto.split("$")[1])
    });
  }

  save(){
    let body: any = {
      id_consultorios_medicos: this.form.get("horario")?.value.id,
      fecha_corte: this.form.get("fecha_corte")?.value,
      fecha_pago: this.form.get("fecha_pago")?.value,
      monto: this.form.get("monto")?.value,
      solvente: this.form.get("solvente")?.value
    };

    console.log(body);

    // if (this.updateForm){

    //   if(this.data.id_consultorios_medicos != body.id_consultorios_medicos){
    //     body.old_id_consultorios_medicos = this.data.id_consultorios_medicos;
    //   }
    //   body.id_payment = this.data.id;
    //   console.log(body);
      
    //   this.adminService.editPayment(body).subscribe({
    //     next: (data: commonResponse) => {
    //       if (data.ok){
    //         this.message.add({
    //           severity: "success",
    //           summary: "Éxito",
    //           detail: "El pago se ha modificado correctamente"
    //         });
  
    //         this.closeModal(false);
    //       }
    //     },
    //     error: (e) => {
    //       console.log(e);
    //       this.message.add({
    //         severity: "error",
    //         summary: "Error",
    //         detail: "Ha ocurrido un error al agregar el pago"
    //       });
    //     }
    //   })

    // }
    // else{
    //   this.adminService.addNewPayment(body).subscribe({
    //     next: (data: commonResponse) => {
    //       if (data.ok){
    //         this.message.add({
    //           severity: "success",
    //           summary: "Éxito",
    //           detail: "El pago se ha agregado correctamente"
    //         });
  
    //         this.closeModal(false);
    //       }
    //     },
    //     error: (e: any) => {
    //       console.log(e);
    //       this.message.add({
    //         severity: "error",
    //         summary: "Error",
    //         detail: "Ha ocurrido un error al agregar el pago"
    //       });
    //     }
    //   });
    // }

  }
  
  closeModal(e: any){
    this.showOut.emit(e);
  }
}
