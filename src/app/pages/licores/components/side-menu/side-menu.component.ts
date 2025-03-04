import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {
// @Input(): Se utiliza para recibir datos de un componente padre.

// Array de categorias, marcas, presentaciones
  @Input() categorias: any[] = [];
  @Input() marcas: any[] = [];
  @Input() presentaciones: any[] = [];

// @Output(): Se utiliza para enviar datos o eventos a un componente padre.

// emite el nombre de categoria, marca, presentacion seleccionada
  @Output() categoriaSeleccionada = new EventEmitter<string>();
  @Output() marcaSeleccionada = new EventEmitter<string>();
  @Output() presentacionSeleccionada = new EventEmitter<string>();

// variables de seguimiento de selecciones 
  selectedCategoria:string | null =null;
  selectedMarca: string = '';
  selectedPresentacion: string = '';

// Emite la categoria seleccionada y actualiza el estado 
  seleccionarCategoria(categoria: string) {
    this.categoriaSeleccionada.emit(categoria);
  }

// Emite la marca seleccionado y actualiza el estado activo
  filtrarPorMarca(marca: string) {
    this.marcaSeleccionada.emit(marca);
  }

// Emite la presentacion seleccionad y actualiza el estado activo
  filtrarPorPresentacion(presentacion: string) {
    this.presentacionSeleccionada.emit(presentacion);
  }
}
