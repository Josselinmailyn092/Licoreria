import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '@models/licores.models';
@Component({
  selector: 'app-filtros-componente',
  templateUrl: './filtros-componente.component.html',
  styleUrl: './filtros-componente.component.css',
})
export class FiltrosComponenteComponent {
  // @Input(): Se utiliza para recibir datos de un componente padre.
  // Array de marcas y presentaciones
  @Input() marcas: string[] = [];
  @Input() presentaciones: number[] = [];

  // numero de productos  y catidad de productos al mostrar por pagina
  @Input() productosTotal: number = 0;
  @Input() productosPorPagina: number = 8;

  // @Output(): Se utiliza para enviar datos o eventos a un componente padre.
  // emite la marca, mililitros, numero de productos por paginas
  @Output() filtrarPorMarca = new EventEmitter<string>();
  @Output() filtrarPorPresentacion = new EventEmitter<number>();
  @Output() cambiarProductosPorPagina = new EventEmitter<number>();
  @Output() filtroSeleccionado = new EventEmitter<string>();

  selectedMarca: any | null = null;
  selectedPresentacion: any = null;

  // manejo de cambio de marcas
  seleccionarMarca(marca: string) {
    this.selectedMarca = marca;
    this.filtrarPorMarca.emit(marca);
    console.log(this.marcas, this.presentaciones);
  }

  // manejo de cambiode presentacion de los productos
  seleccionarPresentacion(presentacion: number) {
    this.selectedPresentacion = presentacion;
    this.filtrarPorPresentacion.emit(presentacion);
  }

  // Manejo de la paginacion
  productosPagina(value: number) {
    this.cambiarProductosPorPagina.emit(value);
  }
  cambiarFiltro(valor: string) {
    this.filtroSeleccionado.emit(valor);
  }
}
