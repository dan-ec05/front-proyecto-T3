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
import { UserFormComponent } from '../../../pages/users/user-form/user-form.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'header',
  standalone: true,
  imports: [
    AvatarModule, 
    ButtonModule, 
    MatSidenavModule, 
    AsyncPipe,
    DialogModule,
    NgClass,
    UserFormComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  sidebarVisible: boolean = true;
  alwaysIcon: boolean = false;
  dialogVisible: boolean = false;

  userData!: userDataInterface | any;
  titleForm: String = "";
  show: boolean = false;

  constructor(
    public layoutService: LayoutService,
    public async: AsyncPipe,
    public authService: AuthService,
    public router: Router
  ){
    if (window.innerWidth <= 730) {
      this.alwaysIcon = true;
    }
  }

  ngOnInit(): void {
    this.sidebarVisible = this.async.transform(this.layoutService.showSidebar)!.valueOf();
    if(!(this.authService._getUserData == null)){
      this.userData = this.authService._getUserData;
    }
    else{
      this.router.navigateByUrl("/login");
    }
  }

  showForm(title: String = "Detalles del usuario"){
    this.userData.editUser = false;
    this.userData.onlyShow = true;
    this.userData.showSecurity = false;
    this.titleForm = title;
    this.show = true;
  }

  closeForm(e: any){
    this.show = e;
  }


  toggleSidebar(){
    this.sidebarVisible = !this.sidebarVisible;
    this.layoutService.showSidebar = of(!(this.async.transform(this.layoutService.showSidebar)));
  }

  toggleDialog(){
    this.dialogVisible = !this.dialogVisible;
  }

  logout(){
    let userData: userDataInterface = JSON.parse(sessionStorage.getItem("userInfo")!);
    this.authService.logout(userData.id).subscribe((res: any) => {
      if (res.ok){
        this.authService.removeUserData();
        this.router.navigateByUrl("/login");
      }
    });
  }

}
