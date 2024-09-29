import { Component, OnInit } from '@angular/core';
import { CardsComponent } from '../../shared/components/cards/cards.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CardsComponent
  ]
})
export class HomeComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
