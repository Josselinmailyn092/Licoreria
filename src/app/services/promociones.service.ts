import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PromocionesService {
  private url = 'http://localhost:3000/promociones';
  constructor(private http: HttpClient) {}

  obtenerPromociones(): Observable<any> {
    return this.http.get<any[]>(`${this.url}`);
  }
  getPromocionDestacada(): Observable<any> {
    return this.http.get(`${this.url}`, { params: { esDestacado: true } });
  }

  eliminarPromocion(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
