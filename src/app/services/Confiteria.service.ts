import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/licores.models';

@Injectable({
  providedIn: 'root'
})
export class ConfiteriaService {
  private apiUrl = 'http://localhost:3000/confiteria';

constructor(private http: HttpClient) { }
// Mostrar todo slos productos de confiteria
getAllProducts():Observable<any[]>{
  return this.http.get<any[]>(`${this.apiUrl}/All`)
}

getTiposConfiteria(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/confiteria-cantidad`);
}
 // api contar tipo de confiteria
 getCategoriasConCantidad(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/confiteria-cantidad`);
}
// Método para obtener marcas de confiteria 
getMarcas(): Observable<any[]>{
  return this.http.get<any[]>(`${this.apiUrl}/marca`)
}

//contar el numero de cada una de las marcas disponibles
  getCountMarcas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/marca-count`);
  }

}
