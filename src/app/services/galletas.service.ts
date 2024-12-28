import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GalletasService {
  private apiUrl= 'http://localhost:3000/galletas';

constructor(private http:HttpClient) { }

// Muestra todos los productos de la categoría Caramelos
getAllProductGalletas(): Observable<any[]>{
  return this.http.get<any[]>(`${this.apiUrl}/All`);
}

// Obtener marcas de la categoría "Caramelos"
getMarcasGalletas(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/`);
}

// Obtener el conteo de marcas de la categoría "Caramelos"
getCountMarcasGalletas(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/count`);
}


}


