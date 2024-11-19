import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/licores.models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-licores',
  templateUrl: './licores.component.html',
  styleUrls: ['./licores.component.css'],
  
})
export class LicoresComponent implements OnInit {
  selectedCategory: string | null = null;
  marcas = ['Carlyle', 'Stolichnaya'];
  presentaciones = ['750 ml', '500 ml'];
  productos: Producto[] = [];
  productosPaginados: Producto[] = [];
  productosPorPagina : number =8;
  totalProductos= 100;
  paginaActual = 1;
  selectedMarca: string = '';
  selectedPresentacion: string = '';
  isCollapsed: boolean = false;
  selectedSubMenu: string = 'Licores';

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    

    this.cargarProductos();
    this.cambiarPagina(this.paginaActual);

    this.route.url.subscribe(url => {
      const subMenu = url[1] ? url[1].path : null;
      this.selectedSubMenu = subMenu ? this.capitalize(subMenu) : 'Licores';
    });
  }

  private capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  selectCategory(category: string) {
    this.selectedCategory = category === 'licores' ? null : category;
    this.isCollapsed = category !== 'licores';
  }

  resetCategory() {
    this.selectedCategory = null;
  }

  filtrarPorCategoria(categoria: string | null): void {
    if (categoria) {
      this.productos = this.productos.filter(producto => producto.nombre.includes(categoria));
    } else {
      this.cargarProductos();
  }
  }

  // Filtrar por marca
  filtrarPorMarca(marca: string): void {
    console.log('Marca seleccionada:', marca);
   const productosFiltrados= this.productos = this.productos.filter(producto => producto.nombre.includes(marca));
    this.productos = productosFiltrados;
    console.log('Productos filtrados:', this.productos);
    this.cambiarPagina(1);
  }

  // Filtrar por presentación
  filtrarPorPresentacion(presentacion: string): void {
    const productosFiltrados =this.productos = this.productos.filter(producto => producto.presentacion_ml.toString() === presentacion);
    this.productos = productosFiltrados;
    this.cambiarPagina(1);
  }

  get totalPaginas(): number {
    return Math.ceil(this.totalProductos / this.productosPorPagina);
  }

  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  cambiarPagina(nuevaPagina: number): void {
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
      const inicio =(nuevaPagina -1)* this.productosPorPagina;
      const fin = inicio +this.productosPorPagina;
      this.productosPaginados = this.productos.slice(inicio, fin);
      console.log('Página actual:', this.paginaActual);
    }
  }

  cargarProductos(): void {
    this.productos = [
      { nombre: 'Whisky Carlyle ', presentacion_ml: 750, descripcion: 'descripción', precio: 19.32, imagenUrl: 'assets/images/licorWhiskey.jpeg' },
      { nombre: 'Whisky Carlyle ', presentacion_ml: 750, descripcion: 'descripción', precio: 40.02, imagenUrl: 'assets/images/licorWhiskey.jpeg' },
      { nombre: 'Stolichnaya Strawberry', presentacion_ml: 750, descripcion: 'descripción', precio: 12.03, imagenUrl: 'assets/images/licorWhiskey.jpeg' },
      { nombre: 'Stolichnaya Raspberry', presentacion_ml: 750, descripcion: 'descripción', precio: 11.87, imagenUrl: 'assets/images/licorWhiskey.jpeg' },
      // More products as needed
      { nombre: 'Whisky Carlyle ', presentacion_ml: 750, descripcion: 'descripción', precio: 19.32, imagenUrl: 'assets/images/licorWhiskey.jpeg' },
      { nombre: 'Whisky Carlyle ', presentacion_ml: 750, descripcion: 'descripción', precio: 40.02, imagenUrl: 'assets/images/licorWhiskey.jpeg' },
      { nombre: 'Stolichnaya Strawberry', presentacion_ml: 750, descripcion: 'descripción', precio: 12.03, imagenUrl: 'assets/images/licorWhiskey.jpeg' },
      { nombre: 'Stolichnaya Raspberry', presentacion_ml: 750, descripcion: 'descripción', precio: 11.87, imagenUrl: 'assets/images/licorWhiskey.jpeg' },
      // More products as needed
    ];
    this.cambiarPagina(this.paginaActual);
  }
}
