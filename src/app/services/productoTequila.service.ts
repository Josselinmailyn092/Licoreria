import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/licores.models';
@Injectable({
  providedIn: 'root'
})
export class ProductoTequilaService {
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
getAllProductTequila(): Observable<any[]>{
  return this.http.get<any[]>(`${this.apiUrl}/marcaTequila/All`)
}

// Obtener marcas de la categoría "Tequila"
getMarcasTequila(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/marcaTequila/`);
}

// Obtener el conteo de marcas de la categoría "Tequila"
getCountMarcasTequila(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/marcaTequila/count`);
}

// Obtener as presentaciones desde la API 
getPresentacionesTequila(): Observable<number[]>{
  return this.http.get<number[]>(`${this.apiUrl}/marcaTequila/presentaciones`)
}
getPresentacionesTequilaCount():Observable<any[]>{
  return this.http.get<any[]>(`${this.apiUrl}/marcaTequila/presentaciones-count`)
}
}
