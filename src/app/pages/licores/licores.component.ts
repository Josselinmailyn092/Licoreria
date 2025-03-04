import { MarcaService } from './../../services/marcas.service';
import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { ProductosService } from '../../services/productos.service';
import { CategoriaService } from '../../services/categoria.service';
import { PresentacionService } from '../../services/presentacion.service';
import { Producto } from '../../models/licores.models';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { ChangeDetectorRef } from '@angular/core';
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
  selectedPresentacion: number | null = 0;
  isCollapsed: boolean = false;
  selectedSubMenu: string = 'Licores';
  productosConPresentaciones: { producto: Producto; presentacion: any }[] = [];

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
    private carritoService: CarritoService,
    private cdr: ChangeDetectorRef
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
        // Transformar productos en items de presentación
    this.productosConPresentaciones = this.productosOriginales.flatMap(producto =>
      producto.presentaciones.map(presentacion => ({
        producto: { ...producto, presentaciones: [presentacion] }, // Clona el producto con solo esta presentación
        presentacion: presentacion
      }))
    );

    this.productos = [...this.productosConPresentaciones.map(item => item.producto)]; // Usar solo el producto clonado
    this.cambiarPagina(1);

      },
      error: (err) => console.error('Error al obtener productos:', err),
    });

    this.route.url.subscribe((url) => {
      const subMenu = url[1] ? url[1].path : null;
      this.selectedSubMenu = subMenu ? this.capitalize(subMenu) : 'Licores';
    });
  }


  // licores.component.ts
agregarProductoAlCarrito(evento: { producto: Producto; presentacion: any }) {
  this.carritoService.agregarProducto(evento.producto, evento.presentacion); // ✅ Recibir objeto
}
  private capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  selectCategory(nombreCategoria: string): void {
    this.selectedCategory = nombreCategoria;
    this.router.navigate(['/', nombreCategoria.toLowerCase()]);
    this.filtrarPorCategoria(nombreCategoria); // Aplica el filtro
  }
  verificarProductosDisponibles(): void {
    if (this.productos.length === 0) {
      console.log('No hay productos disponibles para los filtros seleccionados.');
    }
  }

  filtrarPorCategoria(categoria: string | null): void {
    this.productos = categoria
      ? this.productosOriginales.filter((producto) =>
          producto.nombre
            .toLowerCase()
            .includes(categoria.toLowerCase())
        )
      : [...this.productosOriginales];
    this.cambiarPagina(1);
  }


  filtrarPorMarca(marca: string): void {
    console.log('Marca seleccionada:', marca);
    this.selectedMarca = marca;

    if (!marca || marca.trim() === '') {
      if (this.selectedPresentacion) {
        this.productos = this.productosOriginales.filter(
          (producto) => producto.presentaciones.some(p => p.presentacion_ml === this.selectedPresentacion)
        );
      } else {
        this.productos = [...this.productosOriginales];
      }
    } else {
      this.productos = this.productosOriginales.filter((producto) =>
        producto.nombre.toLowerCase().includes(marca.toLowerCase())
      );

      if (this.selectedPresentacion) {
        this.productos = this.productos.filter(
          (producto) => producto.presentaciones.some(p => p.presentacion_ml === this.selectedPresentacion)
        );
      }
    }

    this.verificarProductosDisponibles();
    this.cambiarPagina(1);
  }


  filtrarPorPresentacion(presentacion: number | null): void {
    this.selectedPresentacion = presentacion;

    // Filtra los productos originales por presentación
    this.productos = presentacion
      ? this.productosOriginales.filter(producto =>
          producto.presentaciones.some(p => p.presentacion_ml === presentacion) // ✅ Usar .some()
        )
      : [...this.productosOriginales];

    // Aplicar filtro de marca si existe
    if (this.selectedMarca) {
      this.productos = this.productos.filter(producto =>
        producto.nombre.toLowerCase().includes(this.selectedMarca.toLowerCase())
      );
    }

    this.cambiarPagina(1);
  }
  get totalPaginas(): number {
    return Math.ceil(this.productos.length / this.productosPorPagina);
  } 

  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  onProductosPorPaginaChange(nuevaCantidad: number) {
    this.productosPorPagina = nuevaCantidad;
    this.paginaActual = 1;
    this.cambiarPagina(1);
  }

cambiarPagina(nuevaPagina: number) {
  this.paginaActual = nuevaPagina;
  const startIndex = (this.paginaActual - 1) * this.productosPorPagina;
  const endIndex = startIndex + this.productosPorPagina;
  this.productosPaginados = this.productos.slice(startIndex, endIndex);
}


}
