import { MarcasService } from './../../services/marcas.service';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { CategoriaService } from '../../services/categoria.service';
import { PresentacionService } from '../../services/presentacion.service';
import { Producto } from '@models/licores.models';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-licores',
  templateUrl: './licores.component.html',
  styleUrls: ['./licores.component.css'],
})
export class LicoresComponent implements OnInit {
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
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.cargarDatosIniciales();
    this.configuracion_ruta();
  }

  // Craga de datos iniciales usando forkjoin eficiencia
  private cargarDatosIniciales(): void {
    forkJoin({
      categorias: this.categoriaService.obtenerCategorias(),
      productosPorCategoria:
        this.categoriaService.obtenerProductosPorCategoria(),
      marcas: this.marcaService.obtenerMarcas(),
      marcasCantidad: this.marcaService.obtenerTotalProductosPorMarcas(),
      presentaciones: this.presentacionService.getTodasPresentaciones(),
      presentacionesCantidad:
        this.presentacionService.getCantidadTodasPresentaciones(),
      productos: this.productosService.obtenerProductos(),
    }).subscribe({
      next: (data) => this.procesarDatosCargados(data),
      error: (err) => this.manejarError(err),
    });
  }

  // Procesa lo sdatos obtenidos de las peticiones
  private procesarDatosCargados(data: any): void {
    this.categorias = data.productosPorCategoria;
    this.marcas = data.marcas;
    this.marcasCantidad = data.marcasCantidad;
    this.presentaciones = data.presentaciones;
    this.presentacionesCantidad = data.presentacionesCantidad;
    this.productosOriginales = this.transformarProductos(data.productos);
    this.productos = [...this.productosOriginales];
    this.cambiarPagina(1);
  }

  // agregar la url de las imagen
  private transformarProductos(productos: Producto[]): Producto[] {
    return productos.map((producto) => ({
      ...producto,
      imagenUrl: `${this.url}/${producto.imagen}`,
    }));
  }

  // configuracion de ruta
  private configuracion_ruta(): void {
    this.route.url.subscribe((url) => {
      const subMenu = url[1] ? url[1].path : null;
      this.selectedSubMenu = subMenu ? this.capitalize(subMenu) : 'Licores';
    });
  }

  // Manejo de filtros en categorias, marca y presentación
  private aplicarFiltros(): void {
    let productosFiltrados = [...this.productosOriginales];

    if (this.seleccionarCategoria) {
      productosFiltrados = this.filtrarPorTexto(
        productosFiltrados,
        this.seleccionarCategoria
      );
    }

    if (this.seleccionarMarca) {
      productosFiltrados = this.filtrarPorTexto(
        productosFiltrados,
        this.seleccionarMarca
      );
    }

    if (this.seleccionarPresentacion) {
      productosFiltrados = productosFiltrados.filter((producto) =>
        producto.presentaciones.some(
          (p) => p.presentacion_ml === this.seleccionarPresentacion
        )
      );
    }

    this.productos = this.ajustarPresentaciones(productosFiltrados);
    this.cambiarPagina(1);
  }

  // DEvuelve solo los productos cuyo nombre inclye el texto buscado
  private filtrarPorTexto(productos: Producto[], texto: string): Producto[] {
    const busqueda = texto.toLowerCase();
    return productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(busqueda)
    );
  }

  // Filtra presentaciones del producto seleccionado
  private ajustarPresentaciones(productos: Producto[]): Producto[] {
    return productos.map((producto) => ({
      ...producto,
      presentaciones: this.seleccionarPresentacion
        ? producto.presentaciones.filter(
            (p) => p.presentacion_ml === this.seleccionarPresentacion
          )
        : producto.presentaciones,
    }));
  }

  // Manejo de eventos
  manejarSeleccionCategoria(categoria: string): void {
    this.seleccionarCategoria = categoria;
    this.router.navigate(['/', categoria.toLowerCase()]);
    this.aplicarFiltros();
  }

  manejarFiltroMarca(marca: string): void {
    this.seleccionarMarca = marca;
    this.aplicarFiltros();
  }

  manejarFiltroPresentacion(presentacion: number | null): void {
    this.seleccionarPresentacion = presentacion;
    this.aplicarFiltros();
  }

  // Actualiza la cantidad de productos por pagina
  cambiarProductosPorPagina(nuevaCantidad: number) {
    this.productosPorPagina = nuevaCantidad;
    this.paginaActual = 1;
    this.cambiarPagina(1);
  }

  // cambiar pagina
  cambiarPagina(nuevaPagina: number) {
    this.paginaActual = nuevaPagina;
    const inicio = (this.paginaActual - 1) * this.productosPorPagina;
    const fin = inicio + this.productosPorPagina;
    this.productosPaginados = this.productos.slice(inicio, fin);
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Calcula cuantas paginas hay en total dividiendiendo la cantidad de productos ente productosPorPaginas
  get totalPaginas(): number {
    return Math.ceil(this.productos.length / this.productosPorPagina);
  }

  // maneja errores
  private manejarError(error: any): void {
    console.error('Error loading data:', error);
    // Aquí podrías agregar lógica para mostrar un mensaje al usuario
  }

  // Conviete la primera letra en mayúscula
  private capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  // Carrito
  agregarProductoAlCarrito(evento: { producto: Producto }) {
    this.carritoService.agregarProducto(evento.producto);
  }
}
