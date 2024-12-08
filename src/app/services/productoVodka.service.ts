import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/licores.models';

@Injectable({
  providedIn: 'root'
})
export class ProductoVodkaService {
  private apiUrl = 'http://localhost:3000';

constructor(private http:HttpClient) { }

getProductos(categoria?: string, marca?: string, presentacion?: number): Observable<Producto[]> {
  const params: any = {};
  if (categoria) params.categoria = categoria;
  if (marca) params.marca = marca;
  if (presentacion) params.presentacion = presentacion;

  return this.http.get<Producto[]>(this.apiUrl, { params });
}
// Muestra todos los productos de la categoria Vodka
getAllProductVodka(): Observable<any[]>{
  return this.http.get<any[]>(`${this.apiUrl}/marcaVodka/All`)
}

// Obtener marcas de la categoría "Vodka"
getMarcasVodka(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/marcaVodka/`);
}

// Obtener el conteo de marcas de la categoría "Vodka"
getCountMarcasVodka(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/marcaVodka/count`);
}

// Obtener as presentaciones desde la API 
getPresentacionesVodka(): Observable<number[]>{
  return this.http.get<number[]>(`${this.apiUrl}/marcaVodka/presentaciones`)
}
getPresentacionesVodkaCount():Observable<any[]>{
  return this.http.get<any[]>(`${this.apiUrl}/marcaVodka/presentaciones-count`)
}
}



