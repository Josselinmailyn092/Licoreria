import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PromocionesService {
  private url = `${environment.url}/promociones`; // Ajusta la URL según tu backend
  constructor(private http: HttpClient) {}

  getPromociones(): Observable<any> {
    return this.http.get<any[]>(`${this.url}`);
  }
  getPromocionDestacada(): Observable<any> {
    return this.http.get(`${this.url}`, { params: { esDestacado: true } });
  }

  eliminarPromocion(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
