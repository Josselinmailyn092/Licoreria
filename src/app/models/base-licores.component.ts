// base-licores.component.ts
import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/licores.models';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from '../services/carrito.service';
import { ChangeDetectorRef } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CategoriaService } from '../services/categoria.service';
import { ProductosService } from '../services/productos.service';
import { PresentacionService } from '../services/presentacion.service';
import { MarcasService } from '../services/marcas.service';

@Component({
  selector: 'app-base-licores',
  template: '',
})
export abstract class BaseLicoresComponent implements OnInit {
  // Propiedad abstracta que debe implementar cada componente hijo
  abstract categoria: string;

  // Variables de estado
  seleccionarCategoria: string | null = null;
  seleccionarMarca: string = '';
  seleccionarPresentacion: number | null = null;
  // paginación
  paginaActual = 1;
  productosPorPagina: number = 8;
  selectedSubMenu: string = 'Licores';
  // url base para las imagenes
  url = '/uploads';

  // Datos comunes Almacenamiento
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
    protected categoriaService: CategoriaService,
    protected productosService: ProductosService,
    protected presentacionService: PresentacionService,
    protected marcaService: MarcasService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected carritoService: CarritoService,
    protected cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarDatosIniciales();
    this.configurarRuta();
  }

  // Craga de datos iniciales usando forkjoin eficiencia
  protected cargarDatosIniciales(): void {
    forkJoin({
      // categorias
      categorias: this.categoriaService.obtenerCategorias(),
      // categorias cantidad
      productosPorCategoria:
        this.categoriaService.obtenerProductosPorCategoria(),
        // marcas
      marcas: this.marcaService.obtenerMarcasPorCategoria(this.categoria),
      // marcas cantidad
      marcasCantidad:
        this.marcaService.obtenerTotalProductosPorMarcasDeCategoria(
          this.categoria
        ),
        // presentaciones
      presentaciones:
        this.presentacionService.obtenerPresentacionesPorCategoria(
          this.categoria
        ),
        // presentacion cantidad
      presentacionesCantidad:
        this.presentacionService.obtenerTotalProductosPorPresentacionesDeCategoria(
          this.categoria
        ),
        // productos
      productos: this.productosService.obtenerProductos({
        categoria: this.categoria,
      }),
    }).subscribe({
      next: (data) => this.procesarDatosCargados(data),
      error: (err) => this.manejarError(err),
    });
  }

  // Procesa los datos obtenidos de las peticiones
  protected procesarDatosCargados(data: any): void {
    this.categorias = data.productosPorCategoria;
    this.marcas = data.marcas;
    this.marcasCantidad = data.marcasCantidad;
    this.presentaciones = data.presentaciones;
    this.presentacionesCantidad = data.presentacionesCantidad;
    this.productosOriginales = this.transformarProductos(data.productos);
    this.productos = [...this.productosOriginales];
    this.cambiarPagina(1);
  }

  // Transforma los productos para agregar la url de la imagen
  protected transformarProductos(productos: Producto[]): Producto[] {
    return productos.map((producto) => ({
      ...producto,
      imagenUrl: `${this.url}/${producto.imagen}`,
    }));
  }

  // configuracion de ruta
  protected configurarRuta(): void {
    this.route.url.subscribe((url) => {
      const subMenu = url[1]?.path;
      this.selectedSubMenu = subMenu
        ? this.capitalizar(subMenu)
        : this.categoria;
    });
  }

  // Métodos de filtrado
  protected aplicarFiltros(): void {
    let productosFiltrados = [...this.productosOriginales];

    productosFiltrados = this.aplicarFiltroTexto(
      productosFiltrados,
      'categoria',
      this.seleccionarCategoria
    );
    productosFiltrados = this.aplicarFiltroTexto(
      productosFiltrados,
      'marca',
      this.seleccionarMarca
    );
    productosFiltrados = this.aplicarFiltroPresentacion(productosFiltrados);

    this.productos = this.ajustarPresentaciones(productosFiltrados);
    this.cambiarPagina(1);
  }

  // Devuelve solo los productos cuyo nombre inclye el texto buscado
  private aplicarFiltroTexto(
    productos: Producto[],
    tipo: string,
    valor: string | null
  ): Producto[] {
    return valor
      ? productos.filter((p) =>
          p[tipo as keyof Producto]
            ?.toString()
            .toLowerCase()
            .includes(valor.toLowerCase())
        )
      : productos;
  }

  private aplicarFiltroPresentacion(productos: Producto[]): Producto[] {
    return this.seleccionarPresentacion
      ? productos.filter((p) =>
          p.presentaciones.some(
            (pr) => pr.presentacion_ml === this.seleccionarPresentacion
          )
        )
      : productos;
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

  // Paginación
  // Actualiza la cantidad de productos por pagina
  cambiarPagina(nuevaPagina: number): void {
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
      const inicio = (nuevaPagina - 1) * this.productosPorPagina;
      const fin = inicio + this.productosPorPagina;
      this.productosPaginados = this.productos.slice(inicio, fin);
    }
  }

  cambiarProductosPorPagina(nuevaCantidad: number): void {
    this.productosPorPagina = nuevaCantidad;
    this.paginaActual = 1;
    this.cambiarPagina(1);
  }

  get totalPaginas(): number {
    return Math.ceil(this.productos.length / this.productosPorPagina);
  }

  // Helpers
  protected capitalizar(texto: string): string {
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  }

  // maneja errores
  protected manejarError(error: any): void {
    console.error('Error cargando datos:', error);
    // Lógica adicional de manejo de errores
  }

  // Método para el carrito
  agregarProductoAlCarrito(evento: { producto: Producto }): void {
    this.carritoService.agregarProducto(evento.producto);
  }
}
