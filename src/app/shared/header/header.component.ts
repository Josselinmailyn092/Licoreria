import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../../models/licores.models';
// Inyección de servio link
import { LinkService } from '../../services/link.service';
// Inyeccion de servico
import { SubmenuService } from '../../services/submenu.service';
import { CarritoService } from '../../services/carrito.service';

// Estructura de la interfaz link
interface Link {
  path: string;
  label: string;
  subMenu?: Link[];
}
interface Slide {
  image: string;
  title: string;
  description: string;
  buttonText: string;
}

interface Category {
  image: string;
  name: string;
  products: number;
  route: string;
}


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'], // Corrección aquí
})
export class HeaderComponent implements OnInit {
  // Propiedades existentes
  imagenLogo: string = 'assets/images/logo-chinito.jpg';
  links: Link[] = [];
  isMenuOpen: boolean = false;
  ModalBuscar: boolean = false;
  menuItems: any[] = [];
  search: string = '';
  isSideMenuOpen = false;
  isCarritoVisible: boolean = false;
  carrito: Producto[] = [];
  total: number = 0;

  // Nuevas propiedades requeridas por el template
  showWhatsAppPopup: boolean = false;
  slides: Slide[] = [
    {
      image: 'assets/images/slide2.jpg',
      title: '¡Bienvenido a Licorería El Chinito!',
      description: 'Descubre nuestra selección de licores de alta calidad.',
      buttonText: 'Ver Ofertas'
    },
    {
      image: 'assets/images/slide3.jpg',
      title: 'Toda la web -10% de descuento',
      description: 'Aprovecha esta oferta exclusiva.',
      buttonText: 'Ir a Licorería'
    }
  ];

  categories: Category[] = [
    {
      image: 'assets/images/whisky-cat.jpg',
      name: 'Whiskies',
      products: 45,
      route: '/whiskies'
    },
    {
      image: 'assets/images/vino-cat.jpg',
      name: 'Vinos',
      products: 32,
      route: '/vinos'
    }
  ];

  featuredProducts: Producto[] = []; // Agregar datos reales aquí

  constructor(
    private linkService: LinkService,
    private router: Router,
    private subMenu: SubmenuService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    // Obtener los enlaces desde el servicio
    this.links = this.linkService.getLinks();

    //obtener links del sub menu
    this.links = this.subMenu.geSubMenuItems();
    this.menuItems = this.subMenu.geSubMenuItems();
    this.carritoService.carrito$.subscribe((productos) => {
      this.carrito = productos;
      this.total = productos.reduce(
        (total, producto) =>
          total + producto.presentaciones[0].precio * (producto.cantidad ?? 0),
        0
      );
    });

    this.carritoService.total$.subscribe((total) => {
      this.total = total;
    });
  }
  // Métodos para WhatsApp
  toggleWhatsAppPopup(event?: boolean): void {
    if (typeof event !== 'undefined') {
      this.showWhatsAppPopup = event;
    } else {
      this.showWhatsAppPopup = !this.showWhatsAppPopup;
    }
  }
  redirectToWhatsApp(): void {
    const phone = '593939380666';
    const message = encodeURIComponent('Hola, necesito información sobre...');
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  }

  // Métodos para navegación
  navigateToCategory(route: string): void {
    this.router.navigate([route]);
  }
  // Método para abrir/cerrar el modal de búsqueda
  toggleSearchModal(): void {
    this.ModalBuscar = !this.ModalBuscar;
  }

  // Método de búsqueda
  onSearch(): void {
    console.log('Buscando:', this.search);
    // Cierra el modal después de buscar
    this.ModalBuscar = false;
  }

  // Método para abrir/cerrar el menú
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenuAndNavigate(path: string): void {
    this.isMenuOpen = false;
    this.router.navigate([path]);
  }

  // Carrito
  agregarProducto(evento: { producto: Producto }) {
    this.carritoService.agregarProducto(evento.producto);
  }

  disminuirCantidad(producto: Producto): void {
    this.carritoService.disminuirCantidad(producto);
  }

  eliminarProducto(productoId: number): void {
    this.carritoService.eliminarProducto(productoId);
  }

  abrirCarrito(): void {
    this.isCarritoVisible = true;
  }

  cerrarCarrito(): void {
    this.isCarritoVisible = false;
  }

  enviarPedidoPorWhatsApp(): void {
    const numeroWhatsApp = '593939380666';
    const saludo = 'Hola buenas tardes me gustaría realizar un pedido:';
    const mensaje = this.carrito
      .map(
        (producto) =>
          `${producto.nombre} (${
            producto.presentaciones[0].presentacion_ml
          } ml) - $${(producto.presentaciones[0].precio * 0.9).toFixed(2)}`
      )
      .join('\n');

    const textoCompleto = `${saludo}\n${mensaje}`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
      textoCompleto
    )}`;

    window.open(url, '_blank');
  }

  limpiarCarrito(): void {
    this.carritoService.limpiarCarrito();
  }
}
