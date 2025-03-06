import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Producto } from '../../../../models/licores.models';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnChanges {
  // @Input(): Se utiliza para recibir datos de un componente padre.
  // RECIBE LISTA DE PRODUCTOS, y los filtra por la presentacion seleccionada
  @Input() productos: any[] = [];

  // Emite un valor cuando se agrega un producto al carrito
  @Output() agregarAlCarrito = new EventEmitter<{
    producto: Producto;
  }>();

  productosPaginados: any;
  filtroSeleccionado: string = ''; // Puede ser el nombre de la categoría o tipo
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productos'] && this.productos) {
      this.productos.forEach((producto) => {
        if (
          !producto.presentacionSeleccionada &&
          producto.presentaciones.length > 0
        ) {
          producto.presentacionSeleccionada = producto.presentaciones[0]; // Asigna la primera presentación
        }
      });
    }
  }
  // Agregar productos al carrito
  agregarProductoAlCarrito(producto: any, presentacion: any) {
    const { presentacionSeleccionada, ...productoSinSeleccionada } = producto;
    const productoCarrito: Producto = {
      ...productoSinSeleccionada,
      presentaciones: presentacion,
    };
    this.agregarAlCarrito.emit({
      producto: productoCarrito,
    });
  }

  // Seleccionar una presentación para un producto
  seleccionarPresentacion(presentacion: any, producto: any) {
    producto.presentacionSeleccionada = presentacion;
  }

  // RETORNO de la url de la imagen
  obtenerImagen(nombreImagen: string): any {
    return 'http://localhost:3000/uploads/' + nombreImagen;
  }
}
