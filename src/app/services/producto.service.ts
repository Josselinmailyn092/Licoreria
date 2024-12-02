import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/licores.models';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private apiUrl = 'http://localhost:3000/producto';

  constructor(private http: HttpClient) {}

  getProductos(categoria?: string, marca?: string, presentacion?: number): Observable<Producto[]> {
    const params: any = {};
    if (categoria) params.categoria = categoria;
    if (marca) params.marca = marca;
    if (presentacion) params.presentacion = presentacion;

    return this.http.get<Producto[]>(this.apiUrl, { params });
  }

  //Muestra todos los productos de la bd
  //endpoint final http://localhost:3000/producto/All.
  getAllProducts():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/All`)
  }

// Método para obtener marcas desde ls API 
  getMarcas(): Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3000/marca')
  }
   //contar el numero de cada una de las marcas disponibles
   getCountMarcas(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/marca/count');
  }


// Obtener as presentaciones desde la API 
  getPresentaciones(): Observable<number[]>{
    return this.http.get<number[]>(`${this.apiUrl}/presentaciones`)
  }
// Contar presentaciones disponibles 
getPresentacionesConCantidad(): Observable<any[]> {
  return this.http.get<any[]>('http://localhost:3000/producto/presentaciones-cantidad');
}

 
  // api tipo de licores disponibles
  getTiposLicores(): Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3000/categoria/tipos-licores')
  }
  // api contar tipo de licores 
  getCategoriasConCantidad(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/categoria/categorias-cantidad');
  }
  


  addProducto(producto: Producto): Observable<any> {
    return this.http.post(this.apiUrl, producto);
  }

  deleteProducto(id_producto: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id_producto}`);
  }
}
