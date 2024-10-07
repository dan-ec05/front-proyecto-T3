import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import moment from 'moment';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';

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
    NgClass
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

  constructor() { }
  
  ngOnInit() {
    this.initForm();

    if(this.data.id != undefined){
      this.setValues();
    }
  }

  initForm(){
    this.form = new FormGroup({
      month: new FormControl("", Validators.required),
      doctor: new FormControl("", Validators.required),
      date: new FormControl(moment().format("YYYY-MM-DD"), Validators.required),
      amount: new FormControl("", Validators.required)
    });
  }

  setValues(){

    let name = this.doctorsList.filter((item: any) => item.name == this.data.name)[0];
    let month = this.monthsList.filter((item: any) => item.name == this.data.paidMonth)[0];

    this.data.amount = String(this.data.amount).slice(0, String(this.data.amount).length - 4);
    console.log(this.data);
    this.form.patchValue({
      month: month,
      doctor: name,
      date: this.data.created_at,
      amount: Number(this.data.amount)
    });
  }

  save(){
    console.log(this.form.value);
  }
  
  closeModal(e: any){
    this.showOut.emit(e);
  }
}
