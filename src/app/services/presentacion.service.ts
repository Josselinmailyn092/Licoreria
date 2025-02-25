import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresentacionService {
  private apiUrl = 'http://localhost:3000/presentaciones'; // Ajusta según tu configuración

  constructor(private http: HttpClient) {}

  // Obtener presentaciones por categoría
  getPresentacionesByCategoria(nombreCategoria: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/categoria/${nombreCategoria}`);
  }

  // Obtener total de productos por presentación en una categoría
  getTotalProductosByPresentacionesByCategoria(nombreCategoria: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/categoria/total/${nombreCategoria}`);
  }

  // Obtener todas las presentaciones disponibles
  getTodasPresentaciones(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/`);
  }

  // Obtener cantidad de productos distintos por cada presentación disponible
  getCantidadTodasPresentaciones(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/total`);
  }

  // Añadir una nueva presentación
  addPresentacion(producto_id: number, presentacion_ml: number, precio: number, cantidad: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/`, { producto_id, presentacion_ml, precio, cantidad });
  }

  // Actualizar una presentación existente
  updatePresentacion(producto_id: number, presentacion_ml_vieja: number, presentacion_ml_nueva: number, cantidad: number, precio: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/`, { producto_id, presentacion_ml_vieja, presentacion_ml_nueva, cantidad, precio });
  }

  // Eliminar una presentación
  deletePresentacion(producto_id: number, presentacion_ml: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/`, { body: { producto_id, presentacion_ml } });
  }
}
