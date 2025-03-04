import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../models/licores.models';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from '../../../services/carrito.service';
import { ChangeDetectorRef } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CategoriaService } from '../../../services/categoria.service';
import { ProductosService } from '../../../services/productos.service';
import { PresentacionService } from '../../../services/presentacion.service';
import { MarcasService } from '../../../services/marcas.service';
@Component({
  selector: 'app-whiskey',
  templateUrl: './whiskey.component.html',
  styleUrls: ['./whiskey.component.css']
})
export class WhiskeyComponent implements OnInit {
   // Variables de estado
   seleccionarCategoria: string | null = null;
   seleccionarMarca: string = '';
   seleccionarPresentacion: number | null = 0;
   // paginación
   paginaActual = 1;
   productosPorPagina: number = 8;
   // colapsabilidad y navegación
   isCollapsed: boolean = false;
   selectedSubMenu: string = 'Licores';  
   // url base para las imagenes
   url = '/uploads';
 
   // Almacenamiento de datos 
   marcas: any[] = [];
   marcasCantidad: any[] = [];
   categorias: any[] = [];
   presentaciones: any[] = [];
   presentacionesCantidad: any[] = [];
   productos: Producto[] = [];
   productosOriginales: Producto[] = [];
   productosPaginados: Producto[] = [];
   totalProductos = 100;
   carrito: Producto[] = [];
   productosConPresentaciones: { producto: Producto; presentacion: any }[] = [];
 
  

  constructor(
    private categoriaService: CategoriaService,
    private productosService: ProductosService,
    private presentacionService: PresentacionService,
    private marcaService: MarcasService,
    private route: ActivatedRoute,
    private router: Router,
    private carritoService: CarritoService,
    private cdr: ChangeDetectorRef
    ) {}


  ngOnInit(): void {
    this.cargarDatosIniciales();
    this.configuracionRuta();

  }

private cargarDatosIniciales(): void {
    forkJoin({
      categorias: this.categoriaService.obtenerCategorias(),
      productosPorCategoria: this.categoriaService.obtenerProductosPorCategoria(),
      marcas: this.marcaService.obtenerMarcasPorCategoria('Whiskey'),
      marcasCantidad: this.marcaService.obtenerTotalProductosPorMarcasDeCategoria('Whiskey'),
      presentaciones: this.presentacionService.obtenerPresentacionesPorCategoria('Whiskey'),
      presentacionesCantidad: this.presentacionService.obtenerTotalProductosPorPresentacionesDeCategoria('Whiskey'),
      productos: this.productosService.obtenerProductos({ categoria: 'Whiskey' })
    }).subscribe({
      next: (data) => this.procesarDatosCargados(data),
      error: (err) => this.manejarError(err)
    });
  }

  private procesarDatosCargados(data: any): void {
    this.categorias = data.productosPorCategoria;
    this.marcas = data.marcas.map((m: any ) => m.nombreMarca);
    this.marcasCantidad = data.marcasCantidad;
    this.presentaciones = data.presentaciones.map((p: any) => p.presentacion_ml);
    this.presentacionesCantidad =  data.presentacionesCantidad.map((p: any) => ({
      presentacion_ml: p.presentacion_ml,
      cantidad: p.cantidad
    }));
    this.productosOriginales = this.transformarProductos(data.productos);
    this.productos = [...this.productosOriginales];
    this.cambiarPagina(1);
  }
  
  private transformarProductos(productos: Producto[]): Producto[] {
    return productos.map(producto => ({
      ...producto,
      imagenUrl: `${this.url}/${producto.imagen}`
    }));
  }

  aplicarFiltros(): void {
    let productosFiltrados = [...this.productosOriginales];
  
    if (this.seleccionarMarca) {
      productosFiltrados = productosFiltrados.filter(producto =>
        producto.marca.toLowerCase().includes(this.seleccionarMarca.toLowerCase())
      );
    }
  
    if (this.seleccionarPresentacion) {
      productosFiltrados = productosFiltrados.filter(producto =>
        producto.presentaciones.some(p => p.presentacion_ml === this.seleccionarPresentacion)
      );
    }
  
    this.productos = productosFiltrados;
    this.cambiarPagina(1);
  }
  
  manejarFiltroMarca(marca: string): void {
    this.seleccionarMarca= marca;
    this.aplicarFiltros();
  }
  
  manejarFiltroPresentacion(presentacion: number | null): void {
    this.seleccionarPresentacion = presentacion;
    this.aplicarFiltros();
  }

  private configuracionRuta(): void {
    this.route.url.subscribe((url) => {
      const subMenu = url[1] ? url[1].path : null;
      this.selectedSubMenu = subMenu ? this.capitalize(subMenu) : 'Whiskey';
    });
  }
  
  selectCategory(nombreCategoria: string): void {
    if (this.seleccionarCategoria !== nombreCategoria) {
      this.router.navigate(['/', nombreCategoria.toLowerCase()]);
    }
  }
  
  private capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

   // Carrito
  //  agregarProductoAlCarrito(producto: Producto): void {
  //   this.carritoService.agregarProducto(producto);
  // }





 

  get totalPaginas(): number {
    return Math.ceil(this.productos.length/ this.productosPorPagina);
  }

  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  cambiarPagina(nuevaPagina: number): void {
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
      const inicio = (nuevaPagina - 1) * this.productosPorPagina;
      const fin = inicio + this.productosPorPagina;
      this.productosPaginados = this.productos.slice(inicio, fin);
      console.log('Página actual:', this.paginaActual);
    }
  }

  // maneja errores
private manejarError(error: any): void {
  console.error('Error loading data:', error);
  // Aquí podrías agregar lógica para mostrar un mensaje al usuario
}
}


