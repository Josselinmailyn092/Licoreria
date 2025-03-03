import { Component, OnInit } from '@angular/core';
import { ProductoCervezaService } from '../../../services/productoCerveza.service';
import { Producto } from '../../../models/licores.models';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';
import { subscribe } from 'diagnostics_channel';
import { CarritoService } from '../../../services/carrito.service';
@Component({
  selector: 'app-cerveza',
  templateUrl: './cerveza.component.html',
  styleUrls: ['./cerveza.component.css']
})
export class CervezaComponent implements OnInit{
  selectedCategory: string | null = 'Cerveza';
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
  selectedSubMenu: string = 'Cerveza';
  carrito: Producto[] = [];
  url='/uploads';

  constructor(private productoCervezaService: ProductoCervezaService, private productoService: ProductoService, private route: ActivatedRoute, private router: Router,private carritoService: CarritoService) {}
  ngOnInit(): void {


  this.selectedCategoria = 'Cerveza'; // Establece la categoría activada por defecto
  this.filtrarPorCategoria(this.selectedCategoria); // Aplica el filtro por defecto si es necesario

    // Obtener categorias de licores
    this.productoService.getTiposLicores().subscribe((data) => {
      this.tiposLicores = data;
    });

    // Obtener cantidad de las categorias de licores
    this.productoService.getCategoriasConCantidad().subscribe((data) => {
      this.categorias = data;
    });

    // Obtener marcas desde la API
    this.productoCervezaService.getMarcasCerveza().subscribe((data)=>{
      this.marcas = data.map((marca)=> marca.nombreMarca);//Indica solo los nombre de la marca
    })

    // Contar cantidad disponible
    this.productoCervezaService.getCountMarcaCerveza().subscribe((data)=>{
      this.marcasCantidad =data; //indica el nombre y la cantidad
    })

    // Obtner productos desde la Api
    this.productoCervezaService.getAllProductCerveza().subscribe((data)=>{
      this.productosOriginales = data.map((producto) => ({
        ...producto,
        imagenUrl: `${this.url}/${producto.imagen}`
      }));
      this.productos = [...this.productosOriginales];
      this.cambiarPagina(this.paginaActual);
    });

    // Obtener presentaciones desde la API
    this.productoCervezaService.getPresentacionesCerveza().subscribe((data)=>{
      this.presentaciones = data;
    });

    // Cantidad de presentaciones dsiponibles
    this.productoCervezaService.getPresentacionesCervezaCount().subscribe((data)=>{
      this.presentacionesCantidad = data;
    });

    // Cantidad de presentaciones disponibles
    this.productoCervezaService.getPresentacionesCervezaCount().subscribe((data)=>{
      this.presentacionesCantidad = data;
    });

    // Suscrebirse a los cambios de la ruta
    this.route.params.subscribe((params)=>{
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
//  // Carrito
//  agregarProductoAlCarrito(producto: Producto): void {
//   this.carritoService.agregarProducto(producto);
// }
  private capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  selectCategory(nombreCategoria: string): void {
    if (this.selectedCategoria !== nombreCategoria) {
      this.selectedCategoria = nombreCategoria; // Actualiza la categoría seleccionada
      this.router.navigate(['/', nombreCategoria.toLowerCase()]); // Navega a la nueva categoría
    } else if (nombreCategoria === 'Cerveza') {
      // Forzar recarga si ya estás en la categoría "Whiskey"
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/', nombreCategoria.toLowerCase()]);
      });
    }
  }

  resetCategory() {
    this.selectedCategory = null;
  }

  filtrarPorCategoria(categoria: string | null): void {
    if (categoria) {
      this.productos = this.productos.filter((producto) => producto.nombre.includes(categoria));
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

  filtrarPorPresentacion(presentacion: number): void {
    console.log('Filtrando por presentación:', presentacion);
    this.selectedPresentacion = presentacion;

    if (!presentacion) {
      if (this.selectedMarca) {
        this.productos = this.productosOriginales.filter((producto) =>
          producto.nombre.toLowerCase().includes(this.selectedMarca.toLowerCase())
        );
      } else {
        this.productos = [...this.productosOriginales];
      }
    } else {
      this.productos = this.productosOriginales.filter(
        (producto) => producto.presentaciones.some(p => p.presentacion_ml === presentacion)
      );

      if (this.selectedMarca) {
        this.productos = this.productos.filter((producto) =>
          producto.nombre.toLowerCase().includes(this.selectedMarca.toLowerCase())
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
}}

