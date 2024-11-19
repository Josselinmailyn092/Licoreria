import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/licores.models';

@Injectable({
  providedIn: 'root',
})
export class LicoresService {
  private apiUrl = 'http://localhost:3000/licores'; // Cambia esto según tu configuración

  constructor(private http: HttpClient) {}

  // Obtener productos con paginación y filtros
  getProductos(page: number, limit: number, marca?: string, categoria?: string, presentacion?: string): Observable<any> {
    const params: any = { page, limit };
    if (marca) params.marca = marca;
    if (categoria) params.categoria = categoria;
    if (presentacion) params.presentacion = presentacion;

    return this.http.get(this.apiUrl, { params });
  }
  getLicores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // Devuelve un array de productos
  }
}
