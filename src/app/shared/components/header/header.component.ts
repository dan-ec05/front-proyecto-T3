import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { LayoutService } from '../../services/layout.service';
import {DialogModule} from "primeng/dialog";
import { of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  standalone: true,
  imports: [
    AvatarModule, 
    ButtonModule, 
    MatSidenavModule, 
    AsyncPipe,
    DialogModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  sidebarVisible: boolean = false;
  dialogVisible: boolean = false;

  constructor(
    public layoutService: LayoutService,
    public async: AsyncPipe,
    public authService: AuthService,
    public router: Router
  ){}


  toggleSidebar(){
    this.layoutService.showSidebar = of(!(this.async.transform(this.layoutService.showSidebar)));
  }

  toggleDialog(){
    this.dialogVisible = !this.dialogVisible;
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }

}
