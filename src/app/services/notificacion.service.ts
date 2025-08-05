import {Injectable} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  constructor(private notificacion: NzMessageService) {}

  showAlert(type: 'success' | 'warning' | 'error' | 'info', message: string): void {
    this.notificacion.create(type, message);
  }
}
