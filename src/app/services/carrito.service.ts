import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Producto} from '@models/licores.models';
import {ProductosService} from '@services/productos.service';
import {NotificacionService} from './notificacion.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: Producto[] = [];
  //CREAR UN WEBSOCKET PARA VER LA DISPONIBILIDAD DE PRODUCTOS EN TIEMPO REAL
  private carritoSubject = new BehaviorSubject<Producto[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);

  // Observables
  carrito$ = this.carritoSubject.asObservable();
  total$ = this.totalSubject.asObservable();

  //Constructor
  constructor(private notificacion: NotificacionService) {
  }
  // Agregar un producto al carrito
  agregarProducto(producto: Producto) {
    const productoConPresentacion: Producto = {
      ...producto,
      presentaciones: producto.presentaciones.map(p => ({
        ...p,
        cantidad: 1
      }))
    };
    const productoExistente = this.carrito.find(
      p => p.id === producto.id && p.presentaciones[0].presentacion_ml === producto.presentaciones[0].presentacion_ml
    );
    if (productoExistente) {
      productoExistente.presentaciones[0].cantidad! += 1;
    } else {
      this.carrito.push(productoConPresentacion);
    }
    this.actualizarCarrito();
    this.notificacion.showAlert('success', '¡Producto añadido al carrito!');

  }

  // Disminuir la cantidad de un producto
  disminuirCantidad(producto: Producto): void {
    const productoExistente = this.carrito.find(
      p =>
        p.id === producto.id &&
        p.nombre === producto.nombre &&
        p.presentaciones[0].presentacion_ml === producto.presentaciones[0].presentacion_ml
    );

    if (productoExistente && productoExistente.presentaciones[0].cantidad! > 1) {
      console.log(productoExistente.presentaciones[0].cantidad);
      productoExistente.presentaciones[0].cantidad = (productoExistente.presentaciones[0].cantidad || 1) - 1;
      // if (productoExistente.presentaciones[0].cantidad <= 0) {
      //   this.carrito = this.carrito.filter((p) => p !== productoExistente);
      // }
    }
    this.actualizarCarrito();
  }

  // Eliminar un producto completamente del carrito
  eliminarProducto(productoId: number, presentacion_ml: number): void {
    this.carrito = this.carrito.filter(p => p.id !== productoId);
    this.actualizarCarrito();
  }

  // Obtener el contenido actual del carrito
  obtenerCarrito(): Producto[] {
    return [...this.carrito];
  }

  // Limpiar el carrito completamente
  limpiarCarrito(): void {
    this.carrito = [];
    this.actualizarCarrito();
  }

  // Notificar cambios a los observadores
  private actualizarCarrito(): void {
    this.carritoSubject.next([...this.carrito]); // Asegúrate de emitir una copia del array
    const total = this.carrito.reduce((sum, prod) => sum + prod.presentaciones[0].precio * (prod.presentaciones[0].cantidad || 0), 0);
    this.totalSubject.next(total); // Emitir el nuevo total
  }
}
