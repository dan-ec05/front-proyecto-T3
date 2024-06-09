import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { LayoutService } from '../../services/layout.service';
import { of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'header',
  standalone: true,
  imports: [AvatarModule, ButtonModule, MatSidenavModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(
    public layoutService: LayoutService,
    public async: AsyncPipe
  ){}

  sidebarVisible: boolean = false;

  toggleSidebar(){
    this.layoutService.showSidebar = of(!(this.async.transform(this.layoutService.showSidebar)));
    console.log(this.async.transform(this.layoutService.showSidebar));
  }

}
