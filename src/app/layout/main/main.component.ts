import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe, NgClass } from '@angular/common';
import { LayoutService } from '../../shared/services/layout.service';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: true,
  imports: [SidebarComponent, RouterOutlet, NgClass, AsyncPipe, HeaderComponent]
})
export class MainComponent  implements OnInit {

  constructor(
    public layoutService: LayoutService
  ) { }

  ngOnInit() {}

}
