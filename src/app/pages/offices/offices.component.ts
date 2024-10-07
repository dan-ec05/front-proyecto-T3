import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.scss'],
  standalone: true,
  imports: [
    TableModule
  ]
})
export class OfficesComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
