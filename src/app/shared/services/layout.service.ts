import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  public showSidebar: Observable<boolean> = of(true);

  constructor() { }
}
