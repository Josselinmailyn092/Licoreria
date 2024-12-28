import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChocolateService {
  private apiUrl = 'http://localhost:3000/chocolate';

constructor(private http:HttpClient) { }
// Muestra todos los productos de la categoría Chocolate
getAllProductChocolate(): Observable<any[]>{
  return this.http.get<any[]>(`${this.apiUrl}/All`);
}

// Obtener marcas de la categoría chocolate
getMarcasChocolate(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/`);
}

// Obtener el conteo de marcas de la categoría "Chocolate"
getCountMarcasChocolate(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/count`);
}

}
