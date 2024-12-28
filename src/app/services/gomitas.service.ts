import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GomitasService {
  private apiUrl = 'http://localhost:3000/gomitas';
constructor( private http:HttpClient) { }


// Muestra todos los productos de la categoría Caramelos
getAllProductGomitas(): Observable<any[]>{
  return this.http.get<any[]>(`${this.apiUrl}/All`);
}

// Obtener marcas de la categoría "Caramelos"
getMarcasGomitas(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/`);
}

// Obtener el conteo de marcas de la categoría "Caramelos"
getCountMarcasGomitas(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/count`);
}


}
