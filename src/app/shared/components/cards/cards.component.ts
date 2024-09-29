import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  standalone: true,
  imports: [NgClass]
})
export class CardsComponent  implements OnInit {

  @Input("title") title!: String;
  @Input("value") value!: Number;
  @Input("border-color") border_color!: String;
  @Input("icon") icon!: String;

  constructor() { }

  ngOnInit() {}

}
