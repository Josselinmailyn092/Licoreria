import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {
  private url = 'http://localhost:3000/marcas'; // Ajusta la URL según tu backend

  constructor(private http: HttpClient) {}

  // Obtener todas las marcas
  obtenerMarcas(): Observable<any> {
    return this.http.get(`${this.url}/`);
  }

  // Obtener el total de productos por marca
  obtenerTotalProductosPorMarcas(): Observable<any> {
    return this.http.get(`${this.url}/total-marca`);
  }

  // Obtener marcas por categoría
  obtenerMarcasPorCategoria(nombreCategoria: string): Observable<any> {
    return this.http.get<{nombreMarca: string}[]>(`${this.url}/${nombreCategoria}`);
  }

  // Obtener total de productos por marcas de una categoría
  obtenerTotalProductosPorMarcasDeCategoria(nombreCategoria: string): Observable<any> {
    return this.http.get(`${this.url}/total-marca/${nombreCategoria}`);
  }

  // Añadir una nueva marca
  añadirMarca(nombreMarca: string, categoria_id: number): Observable<any> {
    return this.http.post(`${this.url}/`, { nombreMarca, categoria_id });
  }

  // Actualizar una marca
  actualizarMarca(id: number, nombreMarca: string): Observable<any> {
    return this.http.put(`${this.url}/`, { id, nombreMarca });
  }

  // Eliminar una marca
  eliminarMarca(id: number): Observable<any> {
    return this.http.delete(`${this.url}/`, { body: { id } });
  }
}
