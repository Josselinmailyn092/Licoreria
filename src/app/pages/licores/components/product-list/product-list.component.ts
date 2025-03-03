import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../../../../models/licores.models';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  @Input() productos: any[] = [];
  @Output() agregarAlCarrito = new EventEmitter<{
    producto: Producto;
    presentacion: any;
  }>();
  productosPaginados: any;
  filtroSeleccionado: string = ''; // Puede ser el nombre de la categoría o tipo


  agregarProductoAlCarrito(producto: Producto, presentacion: any) {
    this.agregarAlCarrito.emit({ producto, presentacion }); // ✅ Emitir objeto
  }
  obtenerImagen(nombreImagen: string): any {
    return 'http://localhost:3000/uploads/' + nombreImagen;
  }



}
