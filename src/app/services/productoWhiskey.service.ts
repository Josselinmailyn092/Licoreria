import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/licores.models';


@Injectable({
  providedIn: 'root'
})
export class ProductoWhiskeyService {
  private apiUrl = 'http://localhost:3000';


constructor(private http:HttpClient) { }

getProductos(categoria?: string, marca?: string, presentacion?: number): Observable<Producto[]> {
  const params: any = {};
  if (categoria) params.categoria = categoria;
  if (marca) params.marca = marca;
  if (presentacion) params.presentacion = presentacion;

  return this.http.get<Producto[]>(this.apiUrl, { params });
}
// Muestra todos los productos de la categoria Whiskey
getAllProductWhiskey(): Observable<any[]>{
  return this.http.get<any[]>(`${this.apiUrl}/marcaWhiskey/All`)
}

// Obtener marcas de la categoría "Whiskey"
getMarcasWhiskey(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/marcaWhiskey/`);
}

// Obtener el conteo de marcas de la categoría "Whiskey"
getCountMarcasWhiskey(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/marcaWhiskey/count`);
}

// Obtener as presentaciones desde la API 
getPresentacionesWhiskey(): Observable<number[]>{
  return this.http.get<number[]>(`${this.apiUrl}/marcaWhiskey/presentaciones`)
}
getPresentacionesWhiskeyCount():Observable<any[]>{
  return this.http.get<any[]>(`${this.apiUrl}/marcaWhiskey/presentaciones-count`)
}
}



