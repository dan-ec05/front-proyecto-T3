import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { LayoutService } from '../../shared/services/layout.service';
import { AsyncPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, AsyncPipe, NgClass]
})
export class AdminComponent  implements OnInit {

  constructor(
    public layoutService: LayoutService
  ) { }

  ngOnInit() {}

}
