import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {
  @Input() categorias: any[] = [];
  @Input() marcas: any[] = [];
  @Input() presentaciones: any[] = [];
  @Output() categoriaSeleccionada = new EventEmitter<string>();
  @Output() marcaSeleccionada = new EventEmitter<string>();
  @Output() presentacionSeleccionada = new EventEmitter<string>();


  selectedCategoria:string | null =null;
  selectedMarca: string = '';
  selectedPresentacion: string = '';


  selectCategory(categoria: string) {
    this.categoriaSeleccionada.emit(categoria);
  }

  filtrarPorMarca(marca: string) {
    this.marcaSeleccionada.emit(marca);
  }

  filtrarPorPresentacion(presentacion: string) {
    this.presentacionSeleccionada.emit(presentacion);
  }
}
