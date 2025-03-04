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
  selector: 'app-cerveza',
  templateUrl: './cerveza.component.html',
  styleUrls: ['./cerveza.component.css']
})
export class CervezaComponent implements OnInit{
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
        marcas: this.marcaService.obtenerMarcasPorCategoria('Cerveza'),
        marcasCantidad: this.marcaService.obtenerTotalProductosPorMarcasDeCategoria('Cerveza'),
        presentaciones: this.presentacionService.obtenerPresentacionesPorCategoria('Cerveza'),
        presentacionesCantidad: this.presentacionService.obtenerTotalProductosPorPresentacionesDeCategoria('Cerveza'),
        productos: this.productosService.obtenerProductos({ categoria: 'Cerveza' })
      }).subscribe({
        next: (data) => this.procesarDatosCargados(data),
        error: (err) => this.manejarError(err)
      });
    }
    // Craga de datos iniciales usando forkjoin eficiencia
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
  // Procesa lo sdatos obtenidos de las peticiones 
    private transformarProductos(productos: Producto[]): Producto[] {
      return productos.map(producto => ({
        ...producto,
        imagenUrl: `${this.url}/${producto.imagen}`
      }));
    }
  
  // configuracion de ruta 
    private configuracionRuta(): void {
      this.route.url.subscribe((url) => {
        const subMenu = url[1] ? url[1].path : null;
        this.selectedSubMenu = subMenu ? this.capitalize(subMenu) : 'Whiskey';
      });
    }
  
  // DEvuelve solo los productos cuyo nombre inclye el texto buscado
  private aplicarFiltros(): void {
    let productosFiltrados = [...this.productosOriginales];
  
    if (this.seleccionarCategoria) {
      productosFiltrados = this.filtrarPorTexto(productosFiltrados, this.seleccionarCategoria);
    }
  
    if (this.seleccionarMarca) {
      productosFiltrados = this.filtrarPorTexto(productosFiltrados, this.seleccionarMarca);
    }
  
    if (this.seleccionarPresentacion) {
      productosFiltrados = productosFiltrados.filter(producto =>
        producto.presentaciones.some(p => p.presentacion_ml === this.seleccionarPresentacion)
      );
    }
  
    this.productos = this.ajustarPresentaciones(productosFiltrados);
    this.cambiarPagina(1);
  }
  
  // DEvuelve solo los productos cuyo nombre inclye el texto buscado
  private filtrarPorTexto(productos: Producto[], texto: string): Producto[] {
    const busqueda = texto.toLowerCase();
    return productos.filter(producto => 
      producto.nombre.toLowerCase().includes(busqueda)
    );
  }
  
  
  // Filtra presentaciones del producto seleccionado 
  private ajustarPresentaciones(productos: Producto[]): Producto[] {
    return productos.map(producto => ({
      ...producto,
      presentaciones: this.seleccionarPresentacion
        ? producto.presentaciones.filter(p => p.presentacion_ml === this.seleccionarPresentacion)
        : producto.presentaciones
    }));
  }
  
  
  // Manejo de eventos
  manejarSeleccionCategoria(categoria: string): void {
    this.seleccionarCategoria= categoria;
    this.router.navigate(['/', categoria.toLowerCase()]);
    this.aplicarFiltros();
  }
    manejarFiltroMarca(marca: string): void {
      this.seleccionarMarca= marca;
      this.aplicarFiltros();
    }
    
    manejarFiltroPresentacion(presentacion: number | null): void {
      this.seleccionarPresentacion = presentacion;
      this.aplicarFiltros();
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
    
  // Actualiza la cantidad de productos por pagina
  cambiarProductosPorPagina(nuevaCantidad: number) {
    this.productosPorPagina = nuevaCantidad;
    this.paginaActual = 1;
    this.cambiarPagina(1);
  }
    
    get totalPaginas(): number {
      return Math.ceil(this.productos.length/ this.productosPorPagina);
    }
  
    // maneja errores
  private manejarError(error: any): void {
    console.error('Error loading data:', error);
    // Aquí podrías agregar lógica para mostrar un mensaje al usuario
  }
  private capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  
  
   // Carrito
    //  agregarProductoAlCarrito(producto: Producto): void {
    //   this.carritoService.agregarProducto(producto);
    // }
  }
  
  
  