import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {
  private url = 'http://localhost:3000/marcas'; // Ajusta según tu configuración

  constructor(private http: HttpClient) {}

  // Obtener marcas por categoría
  getMarcasByCategoria(nombreCategoria: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${nombreCategoria}`);
  }

  // Obtener total de productos por marca en una categoría
  getTotalProductosByMarcasByCategoria(nombreCategoria: string): Observable<any> {
    return this.http.get<any>(`${this.url}/total/${nombreCategoria}`);
  }

  // Añadir una nueva marca
  addMarca(nombreMarca: string, categoria_id: number): Observable<any> {
    return this.http.post<any>(`${this.url}/`, { nombreMarca, categoria_id });
  }

  // Actualizar una marca existente
  updateMarca(id: number, nombreMarca: string): Observable<any> {
    return this.http.put<any>(`${this.url}/`, { id, nombreMarca });
  }

  // Eliminar una marca
  deleteMarca(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/`, { body: { id } });
  }
}
