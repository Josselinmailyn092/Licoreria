import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChupetesService {
  private apiUrl = 'http://localhost:3000/chupetes';

constructor(private http:HttpClient) { }

// Muestra todos los productos de la categoría Caramelos
getAllProductChupetes(): Observable<any[]>{
  return this.http.get<any[]>(`${this.apiUrl}/All`);
}

// Obtener marcas de la categoría "Caramelos"
getMarcasChupetes(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/`);
}

// Obtener el conteo de marcas de la categoría "Caramelos"
getCountMarcasChupetes(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/count`);
}


}


