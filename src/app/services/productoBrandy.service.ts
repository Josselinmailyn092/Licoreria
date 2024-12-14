import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/licores.models';
@Injectable({
  providedIn: 'root'
})
export class ProductoBrandyService {
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
getAllProductBrandy(): Observable<any[]>{
  return this.http.get<any[]>(`${this.apiUrl}/marcaBrandy/All`)
}

// Obtener marcas de la categoría "Brandy"
getMarcasBrandy(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/marcaBrandy/`);
}

// Obtener el conteo de marcas de la categoría "Brandy"
getCountMarcasBrandy(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/marcaBrandy/count`);
}

// Obtener as presentaciones desde la API 
getPresentacionesBrandy(): Observable<number[]>{
  return this.http.get<number[]>(`${this.apiUrl}/marcaBrandy/presentaciones`)
}
getPresentacionesBrandyCount():Observable<any[]>{
  return this.http.get<any[]>(`${this.apiUrl}/marcaBrandy/presentaciones-count`)
}
}
