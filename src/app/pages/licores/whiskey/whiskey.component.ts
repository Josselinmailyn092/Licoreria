import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../models/licores.models';
import { ActivatedRoute,Router } from '@angular/router';


@Component({
  selector: 'app-whiskey',
  templateUrl: './whiskey.component.html',
  styleUrls: ['./whiskey.component.css']
})
export class WhiskeyComponent implements OnInit {
  selectedCategory: string | null = null;
  selectedMarca: string ='';
  productos: Producto[] = [];
  productosPaginados: Producto[] = [];
  productosPorPagina: number = 8;
  totalProductos= 100;
  paginaActual: number = 1;
  selectedPresentacion: string = '';
  isCollapsed: boolean = false;
  marcas = ['Whiskey Brand A', 'Whiskey Brand B','Whiskey Brand C']; // Marcas específicas para Whiskey
  presentaciones = ['750 ml', '100 ml']; // Presentaciones específicas para Whiskey
  selectedSubMenu:string ='whiskey';

  constructor(private router: Router, private route: ActivatedRoute) {}


  ngOnInit(): void {
    this.cargarProductos();
    this.cambiarPagina(this.paginaActual);

    this.route.url.subscribe(url => {
      const subMenu = url[1] ? url[1].path : null;
      this.selectedSubMenu = subMenu ? this.capitalize(subMenu) : 'Whiskey';
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
      this.productos = this.productos.filter(producto => producto.nombreProducto.includes(categoria));
    } else {
      this.cargarProductos();
  }
  }

  // Filtrar por marca
  filtrarPorMarca(marca: string): void {
    console.log('Marca seleccionada:', marca);
   const productosFiltrados= this.productos = this.productos.filter(producto => producto.nombreProducto.includes(marca));
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
         ];
    this.totalProductos = this.productos.length;
    this.cambiarPagina(this.paginaActual);
  }

 
  
}


