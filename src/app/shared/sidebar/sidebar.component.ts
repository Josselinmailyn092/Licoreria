import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/licores.models';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent  implements OnInit{

  selectedCategory: string | null = null;
  marcas = ['Carlyle', 'Stolichnaya'];
  presentaciones = ['750 ml', '500 ml'];
  productos: Producto[] = []; // Especifica el tipo de datos Producto[]
  productosPaginados: Producto[] = [];
  productosPorPagina = 8;
  paginaActual = 1;
  selectedMarca: string = '';  // Define with the appropriate type, if needed
  selectedPresentacion: string = '';

  isCollapsed: boolean = false;
  selectedSubMenu: string = 'Licores';
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.cargarProductos();
    this.cambiarPagina(this.paginaActual);

    this.route.url.subscribe(url => {
      const subMenu = url[1] ? url[1].path : null; // Obtiene el submenú si existe
      this.selectedSubMenu = subMenu ? this.capitalize(subMenu) : 'Licores';
    });
  }

  private capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  
  }
  
  selectCategory(category: string) {
    if (category === 'licores') {
      this.selectedCategory = null; // Restablece la selección para mostrar todas las opciones
      this.isCollapsed = false; // Expande el sidebar
    } else {
      this.selectedCategory = category;
      this.isCollapsed = true; // Colapsa el sidebar para una subcategoría
    }
  }
  resetCategory() {
    this.selectedCategory = null;
  }
  
  filtrarPorCategoria(categoria: string): void {
    // Filtra productos por categoría
  }

  filtrarPorMarca(marca: string): void {
    // Filtra productos por marca
  }

  filtrarPorPresentacion(presentacion: string): void {
    // Filtra productos por presentación
  }

  cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
  }

  cargarProductos(): void {
    this.productos = [
      { nombre: 'Whisky Carlyle 5 Años', presentacion_ml: 750, descripcion:'descripción',precio: 19.32, imagenUrl: 'https://example.com/image1.jpg' },
      { nombre: 'Whisky Carlyle 12 Años', presentacion_ml: 750,descripcion:'descripción' ,precio: 40.02, imagenUrl: 'https://example.com/image2.jpg' },
      { nombre: 'Stolichnaya Strawberry', presentacion_ml: 750, descripcion:'descripción' ,precio: 12.03, imagenUrl: 'https://example.com/image3.jpg' },
      { nombre: 'Stolichnaya Raspberry', presentacion_ml: 750, descripcion:'descripción',precio: 11.87, imagenUrl: 'https://example.com/image4.jpg' },
      // Agrega más productos según sea necesario
    ];
    this.cambiarPagina(this.paginaActual);
  }


}
