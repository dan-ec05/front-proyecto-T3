import { Component, ElementRef, ViewChild } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @ViewChild('inputText') input_text!: ElementRef;
  @ViewChild('inputPass') inputPass!: ElementRef;

  hide: boolean = true;


  focus(i: number){
    if (!i) this.input_text.nativeElement.classList.add("input-focus");
    else this.inputPass.nativeElement.classList.add("input-focus");
  }

  notFocus(i: number){
    if (!i) this.input_text.nativeElement.classList.remove("input-focus");
    else this.inputPass.nativeElement.classList.remove("input-focus");
  }
}
