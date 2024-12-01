import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'loader-button',
  templateUrl: './loader-button.component.html',
  styleUrls: ['./loader-button.component.scss'],
  standalone: true,
})
export class LoaderButtonComponent  implements OnInit {

  @Input("show") show: boolean = false;
  @Input("color") color: string = "#fff";
  @Input("width") width: number = 20;

  constructor() { }

  ngOnInit() {
    // document.documentElement.style.setProperty("", "")
  }

}
