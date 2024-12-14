import { Component, OnInit } from '@angular/core';
import { ProductoVodkaService } from '../../../services/productoVodka.service';
import { Producto } from '../../../models/licores.models';
import { ActivatedRoute, Router  } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-vodka',
  templateUrl: './vodka.component.html',
  styleUrl: './vodka.component.css'
})
export class VodkaComponent implements OnInit {
  selectedCategory: string | null = null;
  marcas: any[] = [];
  marcasCantidad: any[] = [];
  tiposLicores: any[] = [];
  categorias: any[] = [];
  selectedCategoria: string | null = null;
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
  selectedSubMenu: string = 'Vodka';

  constructor(private productoVodkaService: ProductoVodkaService, private productoService: ProductoService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Obtener categorias de licores
    this.productoService.getTiposLicores().subscribe((data) => {
      this.tiposLicores = data;
    });

    // Obtener cantidad de las categorias de licores
    this.productoService.getCategoriasConCantidad().subscribe((data) => {
      this.categorias = data;
    });

    // Obtener marcas desde la API
    this.productoVodkaService.getMarcasVodka().subscribe((data) => {
      this.marcas = data.map((marca) => marca.nombreMarca); // Indica solo los nombres de las marcas
    });

    // Contar cantidad de marcas disponibles
    this.productoVodkaService.getCountMarcasVodka().subscribe((data) => {
      this.marcasCantidad = data; // Data tendrá el formato [{nombreMarca: 'Macallan', cantidad: 5}, ...]
    });

    // Obtener productos desde la API
    this.productoVodkaService.getAllProductVodka().subscribe((data) => {
      this.productosOriginales = data; // Asignar los productos obtenidos a la lista local
      this.productos = [...data];
      this.cambiarPagina(this.paginaActual); // Configurar paginación
    });

    // Obtener presentaciones desde la API
    this.productoVodkaService.getPresentacionesVodka().subscribe((data) => {
      this.presentaciones = data;
    });

    // Cantidad de presentaciones disponibles
    this.productoVodkaService.getPresentacionesVodkaCount().subscribe((data) => {
      this.presentacionesCantidad = data;
    });

    // Suscribirse a los cambios en la ruta
    this.route.params.subscribe((params) => {
      const category = params['category'];
      if (category) {
        this.selectedCategoria = this.capitalize(category);
      }
    });

    // Suscribirse a la URL para cambiar el submenú
    this.route.url.subscribe((url) => {
      const subMenu = url[1] ? url[1].path : null;
      this.selectedSubMenu = subMenu ? this.capitalize(subMenu) : 'Licores';
    });
  }

  private capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  selectCategory(nombreCategoria: string): void {
    if (nombreCategoria) {
      this.selectedCategoria = nombreCategoria; // Marca la categoría seleccionada
      this.router.navigate(['/', nombreCategoria.toLowerCase()]); // Navega al componente correspondiente
    } else {
      console.error("Categoria seleccionada es inválida:", nombreCategoria);
    }
  }
  resetCategory() {
    this.selectedCategory = null;
  }

  filtrarPorCategoria(categoria: string | null): void {
    if (categoria) {
      this.productos = this.productos.filter((producto) => producto.nombreProducto.includes(categoria));
    } else {
      this.productoService.getAllProducts().subscribe((data) => {
        this.productos = data;
        this.cambiarPagina(this.paginaActual);
      });
    }
  }

  verificarProductosDisponibles(): void {
    if (this.productos.length === 0) {
      console.log('No hay productos disponibles para los filtros seleccionados.');
    }
  }

  filtrarPorMarca(marca: string): void {
    console.log('Marca seleccionada:', marca);
    this.selectedMarca = marca;

    if (!marca || marca.trim() === '') {
      if (this.selectedPresentacion) {
        this.productos = this.productosOriginales.filter(
          (producto) => producto.presentacion_ml === this.selectedPresentacion
        );
      } else {
        this.productos = [...this.productosOriginales];
      }
    } else {
      this.productos = this.productosOriginales.filter((producto) =>
        producto.nombreProducto.toLowerCase().includes(marca.toLowerCase())
      );

      if (this.selectedPresentacion) {
        this.productos = this.productos.filter(
          (producto) => producto.presentacion_ml === this.selectedPresentacion
        );
      }
    }

    this.verificarProductosDisponibles();
    this.cambiarPagina(1);
  }

  filtrarPorPresentacion(presentacion: number): void {
    console.log('Filtrando por presentación:', presentacion);
    this.selectedPresentacion = presentacion;

    if (!presentacion) {
      if (this.selectedMarca) {
        this.productos = this.productosOriginales.filter((producto) =>
          producto.nombreProducto.toLowerCase().includes(this.selectedMarca.toLowerCase())
        );
      } else {
        this.productos = [...this.productosOriginales];
      }
    } else {
      this.productos = this.productosOriginales.filter(
        (producto) => producto.presentacion_ml === presentacion
      );

      if (this.selectedMarca) {
        this.productos = this.productos.filter((producto) =>
          producto.nombreProducto.toLowerCase().includes(this.selectedMarca.toLowerCase())
        );
      }
    }

    this.verificarProductosDisponibles();
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
      const inicio = (nuevaPagina - 1) * this.productosPorPagina;
      const fin = inicio + this.productosPorPagina;
      this.productosPaginados = this.productos.slice(inicio, fin);
      console.log('Página actual:', this.paginaActual);
    
  }
}
}



