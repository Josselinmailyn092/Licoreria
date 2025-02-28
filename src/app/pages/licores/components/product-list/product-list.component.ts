import { Component,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  @Input() productos: any[] = [];
  @Output() agregarAlCarrito = new EventEmitter<any>();
productosPaginados: any;

  agregarProductoAlCarrito(producto: any) {
    this.agregarAlCarrito.emit(producto);
  }

}
