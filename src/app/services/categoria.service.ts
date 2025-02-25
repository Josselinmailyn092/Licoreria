import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private url = 'http://localhost:3000/categorias'; // URL de tu backend

  constructor(private http: HttpClient) {}

  // Obtener todas las categorías
  obtenerCategorias(tipoProducto: string = 'Licores'): Observable<any> {
    return this.http.get(`${this.url}/?tipoProducto=${tipoProducto}`);
  }

  // Obtener cantidad de productos por categoría
  obtenerProductosByCategoria(tipoProducto: string = 'Licores'): Observable<any> {
    return this.http.get(`${this.url}/total?tipoProducto=${tipoProducto}`);
  }

  // Añadir una nueva categoría
  añadirCategoria(nombreCategoria: string, tipoProducto: string = 'Licores'): Observable<any> {
    return this.http.post(this.url, { nombreCategoria, tipoProducto });
  }

  // Actualizar una categoría
  actualizarCategoria(id: number, nombre: string, tipo_producto_id: number = 1): Observable<any> {
    return this.http.put(this.url, { id, nombre, tipo_producto_id });
  }

  // Eliminar una categoría
  eliminarCategoria(id: number): Observable<any> {
    return this.http.delete(this.url, { body: { id } });
  }
}
