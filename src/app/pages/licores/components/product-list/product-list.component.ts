import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../../../../models/licores.models';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  // @Input(): Se utiliza para recibir datos de un componente padre.
// RECIBE LISTA DE PRODUCTOS, y los filtra por la presentacion seleccionada 
  @Input() productos: any[] = [];
  @Input() seleccionarPresentacion: number | null = null;

  // Emite un valor cuando se agrega un producto al carrito
  @Output() agregarAlCarrito = new EventEmitter<{
    producto: Producto;
    presentacion: any;
  }>();

  productosPaginados: any;
  filtroSeleccionado: string = ''; // Puede ser el nombre de la categoría o tipo

// Agregar productos al carrito 
  agregarProductoAlCarrito(producto: Producto, presentacion: any) {
    this.agregarAlCarrito.emit({ producto, presentacion });
  }

  // RETORNO de la url de la imagen 
  obtenerImagen(nombreImagen: string): any {
    return 'http://localhost:3000/uploads/' + nombreImagen;
  }

  // filtra el producto a corde a la presentacion seleccionada 
  obtener_Presentaciones_Filtradas(producto: Producto): any[] {
    if (this.seleccionarPresentacion) {
      return producto.presentaciones.filter(p =>
        p.presentacion_ml === this.seleccionarPresentacion
      );
    }
    return producto.presentaciones;
  }


}
