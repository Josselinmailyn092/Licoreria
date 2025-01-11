import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../models/licores.models';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private carrito: Producto[] = [];
  private carritoSubject = new BehaviorSubject<Producto[]>([]);
  carrito$ = this.carritoSubject.asObservable();

  private totalSubject = new BehaviorSubject<number>(0);
  total$ = this.totalSubject.asObservable();

  // Observable para suscribirse al carrito


  // Agregar un producto al carrito
  agregarProducto(producto: Producto): void {
    const productoExistente = this.carrito.find(
      (p) =>
        p.id === producto.id &&
        p.nombreProducto === producto.nombreProducto &&
        p.presentacion_ml === producto.presentacion_ml
    );

    if (productoExistente) {
      productoExistente.cantidad = (productoExistente.cantidad || 1) + 1;
    } else {
      this.carrito.push({ ...producto, cantidad: 1 });
    }

    this.actualizarCarrito();
  }

  // Disminuir la cantidad de un producto o eliminarlo si la cantidad es 0
  disminuirCantidad(producto: Producto): void {
    const productoExistente = this.carrito.find((p) =>
      p.id === producto.id &&
      p.nombreProducto === producto.nombreProducto &&
      p.presentacion_ml === producto.presentacion_ml);


      if (productoExistente) {
        productoExistente.cantidad = (productoExistente.cantidad || 1) - 1;
        if (productoExistente.cantidad <= 0) {
          this.carrito = this.carrito.filter((p) => p !== productoExistente);
        }
      }

      this.actualizarCarrito();
    }



  // Eliminar un producto completamente del carrito
  eliminarProducto(productoId: number): void {
    this.carrito = this.carrito.filter((p) => p.id !== productoId);
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
    const total = this.carrito.reduce((sum, prod) => sum + (prod.precio * (prod.cantidad || 0)), 0);
    this.totalSubject.next(total); // Emitir el nuevo total
  }



}
