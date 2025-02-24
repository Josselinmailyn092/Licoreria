import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Producto } from './licores.models';
import { CarritoService } from '../services/carrito.service';
import { Categoria } from './licores.models';

@Injectable({
  providedIn: 'root' // Esto hace que el servicio esté disponible en toda la aplicación
})
export abstract class BaseProductosComponent implements OnInit {
  marcas: any[] = [];
  marcasCantidad: any[] = [];
  categorias: any[] = [];
  presentaciones: any[] = [];
  presentacionesCantidad: any[] = [];
  productos: Producto[] = [];
  productosOriginales: Producto[] = [];
  productosPaginados: Producto[] = [];
  productosPorPagina = 8;
  paginaActual = 1;
  selectedMarca = '';
  selectedPresentacion = 0;
  selectedCategoria: string | null = null;
  selectedSubMenu = '';
  url = '/uploads';

  constructor(
    protected productoService: any,  // Servicio específico en cada hijo
    protected route: ActivatedRoute,
    protected router: Router,
    protected carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
    this.suscribirRuta();
  }

  cargarDatos(): void {
    this.productoService.getCategoriasConCantidad().subscribe((data: Categoria[]) => (this.categorias = data));
    this.productoService.getCountMarcas().subscribe((data: { marca: string; cantidad: number }[]) => (this.marcasCantidad = data));
    this.productoService.getPresentacionesConCantidad().subscribe((data: { presentacion: number; cantidad: number }[]) => (this.presentacionesCantidad = data));

    this.productoService.getAllProducts().subscribe((data: Producto[]) => {
      this.productosOriginales = data.map((producto: Producto) => ({
      ...producto,
      imagenUrl: `${this.url}/${producto.imagenUrl}`,
      }));
      this.productos = [...this.productosOriginales];
      this.cambiarPagina(this.paginaActual);
    });
  }

  suscribirRuta(): void {
    this.route.url.subscribe((url) => {
      this.selectedSubMenu = url[1] ? this.capitalize(url[1].path) : 'Licores';
    });
  }

  agregarProductoAlCarrito(producto: Producto): void {
    this.carritoService.agregarProducto(producto);
  }

  selectCategory(nombreCategoria: string): void {
    if (nombreCategoria) {
      this.selectedCategoria = nombreCategoria;
      this.router.navigate(['/', nombreCategoria.toLowerCase()]);
    }
  }

  filtrarProductos(): void {
    this.productos = this.productosOriginales.filter((producto) => {
      const coincideMarca = this.selectedMarca
        ? producto.nombreProducto.toLowerCase().includes(this.selectedMarca.toLowerCase())
        : true;
      const coincidePresentacion = this.selectedPresentacion
        ? producto.presentacion_ml === this.selectedPresentacion
        : true;
      return coincideMarca && coincidePresentacion;
    });

    this.cambiarPagina(1);
  }

  filtrarPorMarca(marca: string): void {
    this.selectedMarca = marca;
    this.filtrarProductos();
  }

  filtrarPorPresentacion(presentacion: number): void {
    this.selectedPresentacion = presentacion;
    this.filtrarProductos();
  }

  get totalPaginas(): number {
    return Math.ceil(this.productos.length / this.productosPorPagina);
  }

  cambiarPagina(nuevaPagina: number): void {
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
      const inicio = (nuevaPagina - 1) * this.productosPorPagina;
      this.productosPaginados = this.productos.slice(inicio, inicio + this.productosPorPagina);
    }
  }

  private capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
