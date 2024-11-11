import { Component, OnInit } from '@angular/core';
import { CardsComponent } from '../../shared/components/cards/cards.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';
import { HomeService } from '../../shared/services/home.service';
import { commonResponse } from '../../shared/interfaces/response.interface';
import { MessageService } from 'primeng/api';

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

  summaryOfficesData: any = [
    {name: "Pagados", value: 10},
    {name: "Abonados", value: 5},
    {name: "Sin pagar", value: 0}
  ];
  legendPosition: LegendPosition | any = 'right';
  size: [number, number] = [700, 300]

  cardsValues: any = {
    totalAmount: [
      {total: 0}
    ],
    amountToday: [
      {total: 0}
    ],
    amountCurrentMonth: [
      {total: 0}
    ],
    totalOffices: [
      {total: 0}
    ],
    totalOfficesInUse: [
      {total: 0}
    ],
    totalFreeOffices: [
      {total: 0}
    ]
  };

  constructor(
    public homeService: HomeService,
    public message: MessageService
  ) {
    if (window.innerWidth <= 730 ) {
      this.legendPosition = 'bottom';
      this.size = [(window.innerWidth - 100), 300];
    }
  }

  ngOnInit() {
    this.getTotalAmount();
    this.getSummaryOffices();
  }

  getTotalAmount(){
    this.homeService.getTotalAmount().subscribe({
      next: (data: commonResponse) => {
        if (data.ok){
          this.cardsValues = data.object;
        }
      },
      error: (e) => {
        this.message.add({
          severity: "error",
          summary: "Error",
          detail: "Ha ocurrido un error al leer los datos"
        });
      }
    });
  }

  getSummaryOffices(){
    this.homeService.getSummaryOffices().subscribe({
      next: (data: commonResponse) => {
        console.log(data);
        if (data.ok){
          this.summaryOfficesData = [
            {name: "Pagados", value: data.object.paid[0].totalPagados || 0},
            {name: "Abonados", value: data.object.halfPaid[0].totalAbonados || 0},
            {name: "Sin pagar", value: data.object.notPaid[0].noPagados || 0}
          ];

          console.log(this.summaryOfficesData[0].value && this.summaryOfficesData[1].value && this.summaryOfficesData[2].value);
          console.log(!(this.summaryOfficesData[0].value || this.summaryOfficesData[1].value || this.summaryOfficesData[2].value));
        }
      },
      error: (e) => {
        this.message.add({
          severity: "error",
          summary: "Error",
          detail: "Ha ocurrido un error al leer los datos"
        });
      }
    })
  }

}
