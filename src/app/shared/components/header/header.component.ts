import { Component, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { LayoutService } from '../../services/layout.service';
import {DialogModule} from "primeng/dialog";
import { of } from 'rxjs';
import { AsyncPipe, NgClass } from '@angular/common';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { userDataInterface } from '../../interfaces/user.interface';
import { responseInterface } from '../../interfaces/response.interface';

@Component({
  selector: 'header',
  standalone: true,
  imports: [
    AvatarModule, 
    ButtonModule, 
    MatSidenavModule, 
    AsyncPipe,
    DialogModule,
    NgClass
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  sidebarVisible: boolean = true;
  dialogVisible: boolean = false;

  userData!: userDataInterface | any;

  constructor(
    public layoutService: LayoutService,
    public async: AsyncPipe,
    public authService: AuthService,
    public router: Router
  ){}

  ngOnInit(): void {
    this.userData = this.authService._getUserData;

  }


  toggleSidebar(){
    this.sidebarVisible = !this.sidebarVisible;
    this.layoutService.showSidebar = of(!(this.async.transform(this.layoutService.showSidebar)));
  }

  toggleDialog(){
    this.dialogVisible = !this.dialogVisible;
  }

  logout(){
    let userData: userDataInterface = JSON.parse(localStorage.getItem("userInfo")!);
    this.authService.logout(userData.id).subscribe((res: responseInterface) => {
      if (res.ok){
        this.authService.removeUserData();
        this.router.navigateByUrl("/login");
      }
    });
  }

}
