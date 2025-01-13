import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable , throwError} from 'rxjs';
import { catchError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:3000/dashboard';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/`);
  }

  updateProduct(formData: FormData, id: number) {
    return this.http.put(`http://localhost:3000/dashboard/updateProduct/${id}`, formData);
}


// Método para insertar un producto
insertProduct(formData: FormData): Observable<any> {
  const url = `${this.apiUrl}/insertProducto`;
  return this.http.post(url, formData).pipe(
    catchError(this.handleError)
  );
}

// Manejo de errores
private handleError(error: HttpErrorResponse): Observable<never> {
  console.error('Ocurrió un error:', error);
  return throwError(() => new Error(error.message || 'Error en la API'));
}

deleteProduct(id: number) : Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/deleteProducto/${id}`);
}

getCategories() {
  return this.http.get<any[]>('http://localhost:3000/dashboard/categorias');
}

insertCategory(categoryData: any) {
  return this.http.post('http://localhost:3000/dashboard/categorias', categoryData);
}

updateCategory(categoryData: any, id: number) {
  return this.http.put(`http://localhost:3000/dashboard/categorias/${id}`, categoryData);
}

deleteCategory(id: number) {
  return this.http.delete(`http://localhost:3000/dashboard/categorias/${id}`);
}

}
