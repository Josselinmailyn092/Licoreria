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

  selectedMarca: string = '';
  selectedPresentacion: number | null = null;

  onMarcaChange(marca: string) {
    console.log('Marca seleccionada:', marca)
    this.filtrarPorMarca.emit(marca);
  }

  onPresentacionChange(presentacion: number | null) {
    console.log('Presentación seleccionada:', presentacion);
    this.filtrarPorPresentacion.emit(presentacion ?? 0);
  }

  onProductosPorPaginaChange(value: number) {
    this.cambiarProductosPorPagina.emit(value);
  }

}
