import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  standalone: true,
  imports: [
    DialogModule,
    DropdownModule,
    ReactiveFormsModule,
    NgClass
  ]
})
export class UserFormComponent  implements OnInit {
  
  @Input("show") show: boolean = false;
  @Input("title") title: String = "";
  @Input("data") data: any = {};

  @Output("close") close: EventEmitter<any> = new EventEmitter();

  rolesList: any = [
    {id: 0, name: "Admin"},
    {id: 1, name: "Invitado"}
  ];

  form!: FormGroup;

  constructor() { }

  ngOnInit() {
    this.initForm();

    if(this.data.email != undefined){
      this.setValue();
    }
  }

  initForm(){
    this.form = new FormGroup({
      email: new FormControl("", Validators.required),
      username: new FormControl("", Validators.required),
      full_name: new FormControl("", Validators.required),
      phone: new FormControl("", Validators.required),
      role: new FormControl("", Validators.required)
    });
  }

  setValue(){
    this.form.patchValue({
      email: this.data.email,
      username: this.data.username,
      full_name: this.data.full_name,
      phone: this.data.phonenumber,
      role: this.data.name_rol
    });
  }

  save(){}

  closeModal(e: any){
    this.close.emit(e);
  }

}
