import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number; // in milliseconds
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<Notification>();
  public notification$: Observable<Notification> = this.notificationSubject.asObservable();

  constructor() { }

  show(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', duration: number = 3000): void {
    this.notificationSubject.next({ message, type, duration });
  }
}
