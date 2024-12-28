import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/licores.models';

@Injectable({
  providedIn: 'root'
})
export class ProductoGinService {
  private apiUrl = 'http://localhost:3000';

constructor(private http:HttpClient) { }

getProductos(categoria?: string, marca?: string, presentacion?: number): Observable<Producto[]> {
  const params: any = {};
  if (categoria) params.categoria = categoria;
  if (marca) params.marca = marca;
  if (presentacion) params.presentacion = presentacion;

  return this.http.get<Producto[]>(this.apiUrl, { params });
}
// Muestra todos los productos de la categoria Brandy 
getAllProductGin(): Observable<any[]>{
  return this.http.get<any[]>(`${this.apiUrl}/marcaGin/All`)
}

// Obtener marcas de la categoría "Brandy"
getMarcasGin(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/marcaGin/`);
}

// Obtener el conteo de marcas de la categoría "Brandy"
getCountMarcasGin(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/marcaGin/count`);
}

// Obtener as presentaciones desde la API 
getPresentacionesGin(): Observable<number[]>{
  return this.http.get<number[]>(`${this.apiUrl}/marcaGin/presentaciones`)
}
getPresentacionesGinCount():Observable<any[]>{
  return this.http.get<any[]>(`${this.apiUrl}/marcaGin/presentaciones-count`)
}


}
