import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebarActiveSubject = new BehaviorSubject<boolean>(true);
  sidebarActive$ = this.sidebarActiveSubject.asObservable();

  constructor() { }

  toggleSidebar() {
    this.sidebarActiveSubject.next(!this.sidebarActiveSubject.value);
  }
}
