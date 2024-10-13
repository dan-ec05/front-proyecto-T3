import { Component, OnInit } from '@angular/core';
import { CardsComponent } from '../../shared/components/cards/cards.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CardsComponent,
    DropdownModule,
    FormsModule,
    NgxChartsModule
  ]
})
export class HomeComponent  implements OnInit {

  yearSelected: number | any = 2024;

  monthSelected: string | any = 'Octubre';

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

  monthsSelect = [
    { id: 0, name: 'Enero' },
    { id: 1, name: 'Febrero' },
    { id: 2, name: 'Marzo' },
    { id: 3, name: 'Abril' },
    { id: 4, name: 'Mayo' },
    { id: 5, name: 'Junio' },
    { id: 6, name: 'Julio' },
    { id: 7, name: 'Agosto' },
    { id: 8, name: 'Septiembre'},
    { id: 9, name: 'Octubre' },
    { id: 10, name: 'Noviembre' },
    { id: 11, name: 'Diciembre'}
  ];

  data: any = [
    {name: "Pagados", value: 10},
    {name: "Pendientes", value: 5}
  ];

  constructor() { }

  ngOnInit() {}

}
