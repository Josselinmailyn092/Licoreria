import { Component,  EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrl: './paginacion.component.css'
})
export class PaginacionComponent {
// @Input(): Se utiliza para recibir datos de un componente padre.
// recibe pagina actual desde el omponete padre y e numero total de imagenes
  @Input() paginaActual: number = 1;
  @Input() totalPaginas: number = 1;

// @Output(): Se utiliza para enviar datos o eventos a un componente padre.
// cambiar de pagina 
  @Output() cambiarPagina = new EventEmitter<number>();

  // array con numero d epaginas disponibles
  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  // metodo que emite el numero de pagina cuando se hace clic en un boton 
  cambiar(nuevaPagina: number) {
    this.cambiarPagina.emit(nuevaPagina);
  }

}
