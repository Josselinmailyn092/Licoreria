import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/licores.models';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-licores',
  templateUrl: './licores.component.html',
  styleUrls: ['./licores.component.css'],
})
export class LicoresComponent implements OnInit {
  marcas: string[] = [];
  marcasCantidad: any[] = [];
  categorias: any[] = [];
  presentaciones: any[] = [];
  presentacionesCantidad: any[] = [];
  productos: Producto[] = [];
  productosOriginales: Producto[] = [];
  productosPaginados: Producto[] = [];
  productosPorPagina = 8;
  paginaActual = 1;
  selectedMarca: string = '';
  selectedPresentacion: number = 0;
  selectedCategoria: string | null = null;
  selectedSubMenu: string = 'Licores';
  url = '/uploads';

  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    // Obtener categorías
    this.productoService.getCategoriasConCantidad().subscribe((data) => {
      this.categorias = data;
    });

    // Obtener marcas
    this.productoService.getMarcas().subscribe((data) => {
      this.marcas = data.map((marca) => marca.nombreMarca);
    });

    this.productoService.getCountMarcas().subscribe((data) => {
      this.marcasCantidad = data;
    });

    // Obtener presentaciones
    this.productoService.getPresentaciones().subscribe((data) => {
      this.presentaciones = data;
    });

    this.productoService.getPresentacionesConCantidad().subscribe((data) => {
      this.presentacionesCantidad = data;
    });

    // Obtener productos
    this.productoService.getAllProducts().subscribe((data) => {
      this.productosOriginales = data.map((producto) => ({
        ...producto,
        imagenUrl: `${this.url}/${producto.imagen}`,
      }));
      this.productos = [...this.productosOriginales];
      this.cambiarPagina(this.paginaActual);
    });

    // Obtener submenu desde la URL
    this.route.url.subscribe((url) => {
      this.selectedSubMenu = url[1] ? url[1].path.charAt(0).toUpperCase() + url[1].path.slice(1) : 'Licores';
    });
  }

  // Agregar al carrito
  agregarProductoAlCarrito(producto: Producto): void {
    this.carritoService.agregarProducto(producto);
  }

  // Seleccionar categoría
  selectCategory(nombreCategoria: string): void {
    if (nombreCategoria) {
      this.selectedCategoria = nombreCategoria;
      this.router.navigate(['/', nombreCategoria.toLowerCase()]);
    }
  }

  // Filtrar productos por marca y presentación
  filtrarProductos(): void {
    this.productos = this.productosOriginales.filter((producto) => {
      const coincideMarca = this.selectedMarca ? producto.nombreProducto.toLowerCase().includes(this.selectedMarca.toLowerCase()) : true;
      const coincidePresentacion = this.selectedPresentacion ? producto.presentacion_ml === this.selectedPresentacion : true;
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
      const fin = inicio + this.productosPorPagina;
      this.productosPaginados = this.productos.slice(inicio, fin);
    }
  }
}
