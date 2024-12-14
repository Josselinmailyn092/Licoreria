import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/licores.models';
@Injectable({
  providedIn: 'root'
})
export class ProductoVinosService {
  private apiUrl = 'http://localhost:3000';

constructor(private http:HttpClient) { }

getProductos(categoria?: string, marca?: string, presentacion?: number): Observable<Producto[]> {
  const params: any = {};
  if (categoria) params.categoria = categoria;
  if (marca) params.marca = marca;
  if (presentacion) params.presentacion = presentacion;

  return this.http.get<Producto[]>(this.apiUrl, { params });
}
// Muestra todos los productos de la categoria tequila 
getAllProductVinos(): Observable<any[]>{
  return this.http.get<any[]>(`${this.apiUrl}/marcaVinos/All`)
}

// Obtener marcas de la categoría "Vinos"
getMarcasVinos(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/marcaVinos/`);
}

// Obtener el conteo de marcas de la categoría "Vinos"
getCountMarcasVinos(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/marcaTequila/count`);
}

// Obtener as presentaciones desde la API 
getPresentacionesVinos(): Observable<number[]>{
  return this.http.get<number[]>(`${this.apiUrl}/marcaVinos/presentaciones`)
}
getPresentacionesVinosCount():Observable<any[]>{
  return this.http.get<any[]>(`${this.apiUrl}/marcaVinos/presentaciones-count`)
}
}




