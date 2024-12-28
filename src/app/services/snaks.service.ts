import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SnaksService {
  private apiUrl = 'http://localhost:3000/snaks';

constructor(private http:HttpClient) { }

// Muestra todos los productos de la categoría Caramelos
getAllProductSnaks(): Observable<any[]>{
  return this.http.get<any[]>(`${this.apiUrl}/All`);
}

// Obtener marcas de la categoría "Caramelos"
getMarcasSnaks(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/`);
}

// Obtener el conteo de marcas de la categoría "Caramelos"
getCountMarcasSnaks(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/count`);
}


}

