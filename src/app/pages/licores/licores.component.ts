import { MarcaService } from './../../services/marcas.service';
import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { ProductosService } from '../../services/productos.service';
import { CategoriaService } from '../../services/categoria.service';
import { PresentacionService } from '../../services/presentacion.service';
import { Producto } from '../../models/licores.models';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-licores',
  templateUrl: './licores.component.html',
  styleUrls: ['./licores.component.css'],
})
export class LicoresComponent implements OnInit {
  selectedCategory: string | null = null;
  marcas: any[] = [];
  marcasCantidad: any[] = [];
  categorias: any[] = [];
  presentaciones: any[] = [];
  presentacionesCantidad: any[] = [];
  productos: Producto[] = [];
  productosOriginales: Producto[] = [];
  productosPaginados: Producto[] = [];
  productosPorPagina: number = 8;
  totalProductos = 100;
  paginaActual = 1;
  selectedMarca: string = '';
  selectedPresentacion: number = 0;
  isCollapsed: boolean = false;
  selectedSubMenu: string = 'Licores';
  carrito: Producto[] = [];
  url = '/uploads';

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private productosService: ProductosService,
    private presentacionService: PresentacionService,
    private marcaService: MarcaService,
    private route: ActivatedRoute,
    private router: Router,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    // categorias
    this.categoriaService.obtenerCategorias().subscribe({
      next: (data) => (this.categorias = data),
      error: (err) => console.error('Error al obtener categorías:', err),
    });
    this.categoriaService.obtenerProductosPorCategoria().subscribe({
      next: (data) => (this.categorias = data),
      error: (err) => console.error('Error al obtener categorías:', err),
    });

    // marcas
    this.marcaService.obtenerMarcas().subscribe({
      next: (data) => (this.marcas = data),
      error: (err) => console.error('Error al obtener marcas:', err),
    });

    this.marcaService.obtenerTotalProductosPorMarcas().subscribe({
      next: (data) => (this.marcasCantidad = data),
      error: (err) =>
        console.error('Error al obtener total de productos por marca:', err),
    });
    // ´presentaciones
    this.presentacionService.getTodasPresentaciones().subscribe({
      next: (data) => (this.presentaciones = data),
      error: (err) => console.error('Error al obtener presentaciones:', err),
    });

    this.presentacionService.getCantidadTodasPresentaciones().subscribe({
      next: (data) => (this.presentacionesCantidad = data),
      error: (err) =>
        console.error('Error al obtener cantidad de presentaciones:', err),
    });

    // producto
    this.productosService.obtenerProductos().subscribe({
      next: (data) => {
        this.productosOriginales = data.map((producto) => ({
          ...producto,
          imagenUrl: `${this.url}/${producto.imagen}`,
        }));
        this.productos = [...this.productosOriginales];
        this.cambiarPagina(this.paginaActual);
      },
      error: (err) => console.error('Error al obtener productos:', err),
    });

    this.route.url.subscribe((url) => {
      const subMenu = url[1] ? url[1].path : null;
      this.selectedSubMenu = subMenu ? this.capitalize(subMenu) : 'Licores';
    });
  }

  agregarProductoAlCarrito(producto: Producto): void {
    this.carritoService.agregarProducto(producto);
  }

  private capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  selectCategory(nombreCategoria: string): void {
    if (nombreCategoria) {
      this.selectedCategory = nombreCategoria;
      this.router.navigate(['/', nombreCategoria.toLowerCase()]);
    }
  }

  filtrarPorCategoria(categoria: string | null): void {
    this.productos = categoria
      ? this.productosOriginales.filter((producto) =>
          producto.nombreProducto
            .toLowerCase()
            .includes(categoria.toLowerCase())
        )
      : [...this.productosOriginales];
    this.cambiarPagina(1);
  }

  filtrarPorMarca(marca: string): void {
    console.log('Marca seleccionada:', marca);
    this.selectedMarca = marca;
    this.filtrarProductos();
  }

  filtrarPorPresentacion(presentacion: number): void {
    console.log('Presentación seleccionada:', presentacion);
    this.selectedPresentacion = presentacion;
    this.filtrarProductos();
  }

  private filtrarProductos(): void {
    this.productos = this.productosOriginales.filter((producto) => {
      return (
        (!this.selectedMarca || producto.marca === this.selectedMarca) &&
        (!this.selectedPresentacion ||
          producto.presentacion_ml === this.selectedPresentacion)
      );
    });

    this.cambiarPagina(1); // Actualiza la paginación con los productos filtrados
  }

  get totalPaginas(): number {
    return Math.ceil(this.productos.length / this.productosPorPagina);
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
    }
  }
}
