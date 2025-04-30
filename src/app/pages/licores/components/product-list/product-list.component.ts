import {
  Component,
  HostListener,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Producto } from '@models/licores.models';
import { environment } from '@environments/environment';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnChanges {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  // @Input(): Se utiliza para recibir datos de un componente padre.
  // RECIBE LISTA DE PRODUCTOS, y los filtra por la presentacion seleccionada
  @Input() productos: any[] = [];

  // Emite un valor cuando se agrega un producto al carrito
  @Output() agregarAlCarrito = new EventEmitter<{
    producto: Producto;
  }>();
  isSmallScreen: boolean = false; // Para le gestión de pantallas pequeñas
  productosPaginados: any;
  filtroSeleccionado: string = ''; // Puede ser el nombre de la categoría o tipo
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productos'] && this.productos) {
      this.productos.forEach((producto) => {
        if (
          !producto.presentacionSeleccionada &&
          producto.presentaciones.length > 0
        ) {
          producto.presentacionSeleccionada = producto.presentaciones[0]; // Asigna la primera presentación
        }
      });
    }
  }
  ngOnInit(): void {
    this.checkScreenSize();
  }

  // Detectar cambios en el tamaño de la ventana
  @HostListener('window:resize', [])
  onResize(): void {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isSmallScreen = window.innerWidth <= 825; // Cambiar el umbral según sea necesario}F
    }
  }
  // Agregar productos al carrito
  agregarProductoAlCarrito(producto: any, presentacion: any) {
    const { presentacionSeleccionada, ...productoSinSeleccionada } = producto;
    const productoCarrito: Producto = {
      ...productoSinSeleccionada,
      presentaciones: presentacion,
    };
    this.agregarAlCarrito.emit({
      producto: productoCarrito,
    });
  }

  // Seleccionar una presentación para un producto
  seleccionarPresentacion(event: any, producto: any) {
    let presentacion: any;

    // Verifica si el evento es del tipo select (pantallas pequeñas)
    if (event.target) {
      const selectElement = event.target as HTMLSelectElement; // Asegúrate de que es un <select>
      presentacion = JSON.parse(selectElement.value); // Deserializa el objeto si se usa JSON.stringify
    } else {
      // Si no es un <select>, se asume que es un botón (pantallas grandes)
      presentacion = event;
    }

    // Asignar la presentación seleccionada al producto
    producto.presentacionSeleccionada = presentacion;
  }

  // RETORNO de la url de la imagen
  obtenerImagen(nombreImagen: string): any {
    return `${environment.url}/uploads/` + nombreImagen;
  }
}
