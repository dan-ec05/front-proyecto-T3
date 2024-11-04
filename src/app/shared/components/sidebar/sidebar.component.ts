import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { LayoutService } from '../../services/layout.service';
import { of } from 'rxjs';
import { AsyncPipe, NgClass } from '@angular/common';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass]
})
export class SidebarComponent  implements OnInit {
  sidebarVisible: boolean = true;

  constructor(
    public authService: AuthService,
    public layoutService: LayoutService,
    public async: AsyncPipe,
  ) { }

  ngOnInit() {}

  toggleSidebar(){
    this.sidebarVisible = !this.sidebarVisible;
    this.layoutService.showSidebar = of(!(this.async.transform(this.layoutService.showSidebar)));
  }

}
