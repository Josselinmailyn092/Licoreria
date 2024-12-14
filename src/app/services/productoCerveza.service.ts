import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/licores.models';

@Injectable({
  providedIn: 'root'
})
export class ProductoCervezaService {
  private apiUrl = 'http://localhost:3000';

constructor( private http:HttpClient) { }
getProductos(categoria?: string, marca?: string, presentacion?: number): Observable<Producto[]> {
  const params: any = {};
  if (categoria) params.categoria = categoria;
  if (marca) params.marca = marca;
  if (presentacion) params.presentacion = presentacion;

  return this.http.get<Producto[]>(this.apiUrl, { params });
}
// Muestra todos los productos de la scategoria cerveza
getAllProductCerveza():Observable<any[]>{
  return this.http.get<any[]>(`${this.apiUrl}/marcaCerveza/All`)
}

// Obtener marcas de la categoria "Cerveza"
getMarcasCerveza(): Observable<any[]>{
  return this.http.get<any[]>(`${this.apiUrl}/marcaCerveza/`)
  
}

// Obtener el conteo de la marca de la categoria cerveza
getCountMarcaCerveza():Observable<any[]>{
  return this.http.get<number[]>( `${this.apiUrl}/marcaCerveza/count`)

}
// Obtener las presentaciones desde la API 
getPresentacionesCerveza(): Observable<number[]>{
  return this.http.get<number[]>(`${this.apiUrl}/marcaCerveza/presentaciones`)
}

getPresentacionesCervezaCount(): Observable<any[]>{
  return this.http.get<any[]>(`${this.apiUrl}/marcaCerveza/presentaciones-count`)
}
}
