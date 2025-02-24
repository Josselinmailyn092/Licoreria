import { Component,  EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrl: './paginacion.component.css'
})
export class PaginacionComponent {
  @Input() paginaActual: number = 1;
  @Input() totalPaginas: number = 1;

  @Output() cambiarPagina = new EventEmitter<number>();

  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  cambiar(nuevaPagina: number) {
    this.cambiarPagina.emit(nuevaPagina);
  }

}
