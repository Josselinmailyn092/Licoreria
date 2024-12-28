import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaramelosService {
  private apiUrl = 'http://localhost:3000/caramelos';
constructor(private http:HttpClient){}


// Muestra todos los productos de la categoría Caramelos
getAllProductCaramelos(): Observable<any[]>{
  return this.http.get<any[]>(`${this.apiUrl}/All`);
}

// Obtener marcas de la categoría "Caramelos"
getMarcasCaramelos(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/`);
}

// Obtener el conteo de marcas de la categoría "Caramelos"
getCountMarcasCaramelos(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/count`);
}


}
