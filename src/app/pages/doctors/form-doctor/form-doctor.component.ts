import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'form-doctor',
  templateUrl: './form-doctor.component.html',
  styleUrls: ['./form-doctor.component.scss'],
  standalone: true,
  imports: [
    DropdownModule,
    DialogModule,
    ReactiveFormsModule,
    NgClass
  ]
})
export class FormDoctorComponent  implements OnInit {
  @Input("show") show: boolean = false;
  @Input("data") data: any = {};
  @Input("title") title: String = "";
  @Output("close") close: EventEmitter<boolean> = new EventEmitter();

  form!: FormGroup;

  specialismList: any = [
    {id: 0, name: "Alergología"},
    {id: 1, name: "Anatomía Patológica"},
    {id: 2, name: "Anestesiología"},
    {id: 3, name: "Cardiología"},
    {id: 4, name: "Cardiología Infantil"},
    {id: 5, name: "Cirugía Bariátrica"},
    {id: 6, name: "Cirugía Bucal y Maxilofacial"},
    {id: 7, name: "Cirugía de Cabeza y Cuello"},
    {id: 8, name: "Cirugía Cardiovascular"},
    {id: 9, name: "Cirugía General"},
    {id: 10, name: "Cirugía Pediátrica"},
    {id: 11, name: "Cirugía Plástica"},
    {id: 12, name: "Cirugía de la Mano"},
    {id: 13, name: "Cirugía de Tórax"},
    {id: 14, name: "Coloproctología"},
    {id: 15, name: "Dermatología"},
    {id: 16, name: "Endocrinología"},
    {id: 17, name: "Endocrinología Pediátrica"},
    {id: 18, name: "Enfermedades Infecciosas"},
    {id: 19, name: "Fertilidad"},
    {id: 20, name: "Gastroenterología"},
    {id: 21, name: "Gastroenterología Pediátrica"},
    {id: 22, name: "Ginecología"},
    {id: 23, name: "Hematología y Hemoterapia"},
    {id: 24, name: "Hematoncología Pediátrica"},
    {id: 25, name: "Hepatología"},
    {id: 26, name: "Infectología Pediátrica"},
    {id: 27, name: "Inmunología"},
    {id: 28, name: "Medicina del Dolor"},
    {id: 29, name: "Medicina Física y Rehabilitación"},
    {id: 30, name: "Medicina Interna"},
    {id: 31, name: "Medicina Nuclear"},
    {id: 32, name: "Nefrología y Diálisis"},
    {id: 33, name: "Nefrología Pediátrica"},
    {id: 34, name: "Neumonología"},
    {id: 35, name: "Neumonología Pediátrica"},
    {id: 36, name: "Neurocirugía"},
    {id: 37, name: "Neurología"},
    {id: 38, name: "Neuropediatría"},
    {id: 39, name: "Nutrición"},
    {id: 40, name: "Obstetricia"},
    {id: 41, name: "Odontología"},
    {id: 42, name: "Odontología Integral del Adulto"},
    {id: 43, name: "Odontopediatría y Ortodoncia"},
    {id: 44, name: "Oftalmología"},
    {id: 45, name: "Oncología Médica"},
    {id: 46, name: "Otorrinolaringología"},
    {id: 47, name: "Pediatría"},
    {id: 48, name: "Psiquiatría"},
    {id: 49, name: "Radiología e Imagenología"},
    {id: 50, name: "Radioterapia"},
    {id: 51, name: "Reumatología"},
    {id: 52, name: "Traumatología"},
    {id: 53, name: "Traumatología Pediátrica"},
    {id: 54, name: "Urología"},
    {id: 55, name: "Urología Pediátrica"},
    {id: 56, name: "Médico Cirujano"},
    {id: 57, name: "Estética"}
]

  constructor() { }

  ngOnInit() {
    this.initForm();

    if (this.data.dni != undefined){
      this.setValue();
    }
  }

  setValue(){
    let specialism = this.specialismList.filter((item: any) => item.name == this.data.main)[0];
    this.form.patchValue({
      full_name: this.data.full_name,
      dni: this.data.dni,
      specialism: specialism
    });
  }

  initForm(){
    this.form = new FormGroup({
      full_name: new FormControl("", Validators.required),
      dni: new FormControl("", Validators.required),
      specialism: new FormControl("", Validators.required)
    });
  }

  closeModal(e: any){
    this.data = {};
    this.close.emit(e);
  }

  save(){}

}
