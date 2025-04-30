import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private apiUrl = `${environment.url}/productos`; // Ajusta la URL según tu backend

  constructor(private http: HttpClient) {}

  obtenerProductoPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  obtenerProductos(filtros: any = {}): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { params: filtros });
  }

  obtenerProductosDestacados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/destacados`);
  }

  añadirProducto(producto: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, producto);
  }

  actualizarProducto(producto: FormData): Observable<any> {
    return this.http.put<any>(this.apiUrl, producto);
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.request<any>('delete', this.apiUrl + '/' + id);
  }
}
