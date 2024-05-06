import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';


@Component({
  selector: 'nav-bar-header',
  standalone: true,
  imports: [AvatarModule],
  templateUrl: './nav-bar-header.component.html',
  styleUrl: './nav-bar-header.component.scss'
})
export class NavBarHeader {

}
