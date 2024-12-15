import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from './producto.service';
@Injectable({
  providedIn: 'root'
})
export class FuncionesService {
  selectedCategoria:string | null =null;
constructor(private router: Router) { }
ngOnInit(): void {
  this.productoService.getCategoriasConCantidad().subscribe((data) => {
    this.categorias = data;
  });
  
}

selectCategory(nombreCategoria: string): void {
  if (nombreCategoria) {
    this.selectedCategoria = nombreCategoria; // Marca la categoría seleccionada
    this.router.navigate(['/', nombreCategoria.toLowerCase()]); // Navega al componente correspondiente
  } else {
    console.error("Categoria seleccionada es inválida:", nombreCategoria);
  }
}

}
