import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private apiUrl = 'http://localhost:3000/productos'; // URL de tu API

  constructor(private http:HttpClient) { }
  getMarcas(): Observable <string []>{
    return this.http.get<string[]> (this.apiUrl);
  }
}
