import { Component } from '@angular/core';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent {
  nombreTienda: string = 'Licorería Premium';
  emailContacto: string = 'contacto@licoreria.com';
  telefono: string = '+34 123 456 789';
  stockMinimo: number = 4;
  notificacionesEmail: boolean = true;

  guardarCambios() {
    console.log('Guardando cambios...');
    console.log('Nombre de la Tienda:', this.nombreTienda);
    console.log('Email:', this.emailContacto);
    console.log('Teléfono:', this.telefono);
    console.log('Stock Mínimo:', this.stockMinimo);
    console.log('Notificaciones por Email:', this.notificacionesEmail);
  }
}
