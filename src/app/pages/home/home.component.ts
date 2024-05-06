import { Component } from '@angular/core';
import { NavBarMenu } from '../../shared/components/nav-bar-menu/nav-bar.component';
import { NavBarHeader } from '../../shared/components/nav-bar-header/nav-bar-header.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [NavBarMenu, NavBarHeader],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class Home {

  sidebarVisible: boolean = false;

}
