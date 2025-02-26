import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private url = 'http://localhost:3000/productos';
  constructor(private httpService: HttpClient) {}
  // Obtener todos los productos con filtros opcionales
  obtenerProductos(
    marca?: string,
    categegoria?: string,
    presentacion?: number,
    esDestacado?: boolean,
    tieneDescuento?: boolean,
    tipoProducto?: string
  ): Observable<any[]> {
    const params: any = {};
    if (marca) params.marca = marca;
    if (categegoria) params.categoria = categegoria;
    if (presentacion) params.presentacion = presentacion;
    if (esDestacado) params.esDestacado = esDestacado;
    if (tieneDescuento) params.tieneDescuento = tieneDescuento;
    if (tipoProducto) params.tipoProducto = tipoProducto;
    return this.httpService.get<any[]>(this.url, { params });
  }

  // Obtener información del producto desde su ID
  obtenerProducto(id: number): Observable<any> {
    return this.httpService.get<any>(`${this.url}/${id}`);
  }
}
