import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LicoresService {
  private apiUrl = 'http://localhost:3000/productos'; // URL de tu API

  constructor(private http: HttpClient) {}

  getProductos(page: number, limit: number, marca?: string, categoria?: string, presentacion?: number): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    
    if (marca) params = params.set('marca', marca);
    if (categoria) params = params.set('categoria', categoria);
    if (presentacion) params = params.set('presentacion', presentacion.toString());

    return this.http.get<any>(this.apiUrl, { params });
  }
}
