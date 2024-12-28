import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChicleService {
  private apiUrl = 'http://localhost:3000/chicle';

constructor(private http:HttpClient) { }


// Muestra todos los productos de la categoría Caramelos
getAllProductChicle(): Observable<any[]>{
  return this.http.get<any[]>(`${this.apiUrl}/All`);
}

// Obtener marcas de la categoría "Caramelos"
getMarcasChicle(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/`);
}

// Obtener el conteo de marcas de la categoría "Caramelos"
getCountMarcasChicle(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/count`);
}
}
