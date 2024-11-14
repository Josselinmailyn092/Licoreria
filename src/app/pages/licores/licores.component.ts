import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/licores.models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-licores',
  templateUrl: './licores.component.html',
  styleUrls: ['./licores.component.css']
})
export class LicoresComponent implements OnInit {
  selectedCategory: string | null = null;
  marcas = ['Carlyle', 'Stolichnaya'];
  presentaciones = ['750 ml', '500 ml'];
  productos: Producto[] = [];
  productosPaginados: Producto[] = [];
  productosPorPagina = 8;
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

  filtrarPorMarca(marca: string): void {
    this.productos = this.productos.filter(producto => producto.nombre.includes(marca));
  }

  filtrarPorPresentacion(presentacion: string): void {
    this.productos = this.productos.filter(producto => producto.presentacion_ml.toString() === presentacion);
  }

  cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.productosPaginados = this.productos.slice(
      (pagina - 1) * this.productosPorPagina,
      pagina * this.productosPorPagina
    );
  }

  cargarProductos(): void {
    this.productos = [
      { nombre: 'Whisky Carlyle ', presentacion_ml: 750, descripcion: 'descripción', precio: 19.32, imagenUrl: 'https://example.com/image1.jpg' },
      { nombre: 'Whisky Carlyle ', presentacion_ml: 750, descripcion: 'descripción', precio: 40.02, imagenUrl: 'https://example.com/image2.jpg' },
      { nombre: 'Stolichnaya Strawberry', presentacion_ml: 750, descripcion: 'descripción', precio: 12.03, imagenUrl: 'https://example.com/image3.jpg' },
      { nombre: 'Stolichnaya Raspberry', presentacion_ml: 750, descripcion: 'descripción', precio: 11.87, imagenUrl: 'https://example.com/image4.jpg' },
      // More products as needed
    ];
    this.cambiarPagina(this.paginaActual);
  }
}
