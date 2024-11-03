import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { AdminService } from '../../../shared/services/admin.service';
import { commonResponse } from '../../../shared/interfaces/response.interface';
import { CalendarModule } from 'primeng/calendar';
import moment from 'moment';
import { ValidatorsUtils } from '../../../shared/utils/validators.utils';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'schedules-form',
  templateUrl: './schedules-form.component.html',
  styleUrls: ['./schedules-form.component.scss'],
  standalone: true,
  imports: [
    DialogModule,
    ReactiveFormsModule,
    NgClass,
    DropdownModule,
    CalendarModule,
    SelectButtonModule
  ]
})
export class SchedulesFormComponent  implements OnInit {

  @Input("data") data: any = {};
  @Input("title") title: String = "Agregar horario";
  @Input("show") show: boolean = false;
  @Output("close") showOut: EventEmitter<boolean> = new EventEmitter();

  form!: FormGroup;
  updateForm: boolean = false;

  doctorsOffices: any = [];
  conditionList: any = [
    {id: 0, name: "Mañana", value: "M"},
    {id: 1, name: "Tarde", value: "T"},
    {id: 2, name: "Exclusivo", value: "E"},
    {id: 3, name: "Sin uso", value: "not_used"},
  ];
  doctorsList: any = [];
  selectButtonOptions: any = [
    {id: 0, name: "No solvente", icon: 'pi pi-ban', color: 'red'},
    {id: 1, name: "Solvente", icon: 'pi pi-check', color: 'green'},

  ];

  constructor(
    public adminService: AdminService,
    public validators: ValidatorsUtils,
    public message: MessageService
  ) { }

  ngOnInit() {
    this.initForm();
    this.get();
  }

  setHour(time: String){
    const date = new Date().setHours(Number(time.slice(0, 2)), Number(time.slice(3, 5)));
    return new Date(date);
  }

  setValues(){
    this.form.patchValue({
      id_medico: this.doctorsList.filter((item: any) => item.id == this.data.id_medico)[0],
      id_consultorio: this.doctorsOffices.filter((item: any) => item.id == this.data.id_consultorio)[0],
      condicion: this.conditionList.filter((item: any) => item.value == this.data.condicion)[0],
      hora_inicio: this.setHour(this.data.hora_inicio),
      hora_fin: this.setHour(this.data.hora_fin),
      // solvente: this.selectButtonOptions.filter((item: any) => item.id == this.data.solvente)[0]
    });
  }

  closeModal(e: any){
    this.showOut.emit(e);
  }

  get(){
    this.adminService.getAllDoctorsOffice().subscribe({
      next: (data: commonResponse) => {
        data.object.forEach((item: any) => {
          item.num_consultorio = `Consultorio - ${item.num_consultorio}`
        })
        this.doctorsOffices = data.object;
      },
      error: (e) => {
        console.log(e);
      }
    });

    this.adminService.getAllDoctors().subscribe({
      next: (data: commonResponse) => {
        data.object.forEach((item: any) => {
          item.name = item.nombre_completo;
        });
        this.doctorsList = data.object;
        console.log(Object.keys(this.data).length);
        if (Object.keys(this.data).length){
          this.updateForm = true;
          this.setValues();
        }
      },
      error: (e: any) => {
        console.log(e);
      }
    })
  }

  initForm(){
    this.form = new FormGroup({
      id_medico: new FormControl(null, [Validators.required]),
      id_consultorio: new FormControl(null, [Validators.required]),
      condicion: new FormControl("", [Validators.required]),
      hora_inicio: new FormControl("", [Validators.required]),
      hora_fin: new FormControl("", [Validators.required]),
      // solvente: new FormControl("", [Validators.required])
    });
  }

  save(){
    let body: any = {
      condicion: this.form.get("condicion")?.value.value,
      id_medico: this.form.get("id_medico")?.value.id,
      id_consultorio: this.form.get("id_consultorio")?.value.id,
      hora_inicio: moment(this.form.get("hora_inicio")?.value).format("HH:mm"),
      hora_fin: moment(this.form.get("hora_fin")?.value).format("HH:mm"),
    };

    console.log(this.updateForm);

    if (this.updateForm){

      body.id = this.data.id;

      this.adminService.editSchedule(body).subscribe({
        next: (data: commonResponse) => {
          console.log(data);
          this.message.add({
            severity: "success",
            summary: "Éxito",
            detail: "Se ha actualizado el horario correctamente"
          });
          this.closeModal(true);
        },
        error: (e) => {
          console.log(e);
          this.message.add({
            severity: "error",
            summary: "Error",
            detail: "Ha ocurrido un error al actualizar los datos"
          });
        }
      });
    }
    else{
      this.adminService.addNewSchedule(body).subscribe({
        next: (data: commonResponse) => {
          console.log(data);
          this.message.add({
            severity: "success",
            summary: "Éxito",
            detail: "Se ha agregado el nuevo horario correctamente"
          });
          this.closeModal(true);
        },
        error: (e) => {
          console.log(e);
          this.message.add({
            severity: "error",
            summary: "Error",
            detail: "Ha ocurrido un error al guardar los datos"
          });
        }
      });
    }

  }

}
