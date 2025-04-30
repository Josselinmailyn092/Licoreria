import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private url = `${environment.url}/categorias`; // Ajusta la URL según tu backend

  constructor(private http: HttpClient) {}

  // Obtener todas las categorías
  obtenerCategorias(): Observable<any> {
    return this.http.get(`${this.url}/`);
  }

  // Obtener productos por categoría
  obtenerProductosPorCategoria(): Observable<any> {
    return this.http.get(`${this.url}/total-categoria`);
  }

  // Añadir una categoría
  añadirCategoria(nombreCategoria: string): Observable<any> {
    return this.http.post(`${this.url}/`, { nombreCategoria });
  }

  // Actualizar una categoría
  actualizarCategoria(
    id: number,
    nombre: string,
    tipo_producto_id: number = 1
  ): Observable<any> {
    return this.http.put(`${this.url}/${id}`, { id, nombre, tipo_producto_id });
  }

  // Eliminar una categoría
  eliminarCategoria(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
