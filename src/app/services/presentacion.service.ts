import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresentacionService {
  private url = 'http://localhost:3000/presentaciones'; // Ajusta la URL según tu backend

  constructor(private http: HttpClient) {}

  // Obtener presentaciones por categoría
  getPresentacionesPorCategoria(nombreCategoria: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/categoria/${nombreCategoria}`);
  }

  // Obtener total de productos por presentación en una categoría
  getTotalProductosPorCategoria(nombreCategoria: string): Observable<any> {
    return this.http.get<any>(`${this.url}/total/categoria/${nombreCategoria}`);
  }

  // Obtener todas las presentaciones disponibles
  getTodasPresentaciones(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}`);
  }

  // Obtener la cantidad de presentaciones distintas
  getCantidadTodasPresentaciones(): Observable<any> {
    return this.http.get<any>(`${this.url}/total`);
  }

  // Añadir una nueva presentación
  addPresentacion(presentacion: any): Observable<any> {
    return this.http.post<any>(`${this.url}`, presentacion);
  }

  // Actualizar una presentación existente
  updatePresentacion(presentacion: any): Observable<any> {
    return this.http.put<any>(`${this.url}`, presentacion);
  }

  // Eliminar una presentación
  deletePresentacion(data: { producto_id: number; presentacion_ml: number }): Observable<any> {
    return this.http.request<any>('delete', `${this.url}`, { body: data });
  }
}
