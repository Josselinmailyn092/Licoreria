import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../../../../models/licores.models';
@Component({
  selector: 'app-filtros-componente',
  templateUrl: './filtros-componente.component.html',
  styleUrl: './filtros-componente.component.css'
})
export class FiltrosComponenteComponent {
  @Input() marcas: string[] = [];
  @Input() presentaciones: number[] = [];
  @Input() productosTotal: number = 0;
  @Input() productosPorPagina: number = 8;

  @Output() filtrarPorMarca = new EventEmitter<string>();
  @Output() filtrarPorPresentacion = new EventEmitter<number>();
  @Output() cambiarProductosPorPagina = new EventEmitter<number>();
  @Output() filtroSeleccionado = new EventEmitter<string>();

  selectedMarca: string = '';
  selectedPresentacion: any;

  // filtros-componente.component.ts
onMarcaChange(marca: string) {
  this.selectedMarca = marca;
  this.filtrarPorMarca.emit(marca);
}

onPresentacionChange(presentacion: number ) {
  this.selectedPresentacion = presentacion;
  this.filtrarPorPresentacion.emit(presentacion );
}

  onProductosPorPaginaChange(value: number) {
    this.cambiarProductosPorPagina.emit(value);
  }
  cambiarFiltro(valor: string) {
    this.filtroSeleccionado.emit(valor);
  }

}
