import { Component } from '@angular/core';

@Component({
  selector: 'app-promocion',
  templateUrl: './promocion.component.html',
  styleUrl: './promocion.component.css'
})
export class PromocionComponent {
  searchQuery: string = '';
  promotions: Array<{
    id_promocion: number;
    nombrePromocion: string;
    descripcion: string;
    descuento: number;
    precio: number | null;
    imagenes: string;
    fecha_inicio: string;
    fecha_fin: string;
    id_producto: number | null;
    id_categoria: number | null;
    es_destacada: boolean;
  }> = [];
  filteredPromotions: Array<typeof this.promotions[0]> = [];
  isModalVisible: boolean = false;
  isNoPromocionModalVisible: boolean = false;
  selectedPromotion: typeof this.promotions[0] = this.createEmptyPromotion();

  ngOnInit(): void {
    // Simulando datos iniciales
    this.promotions = [
      {
        id_promocion: 1,
        nombrePromocion: 'Descuento 10% en Vino Tinto',
        descripcion: 'Promoción por tiempo limitado de 10% de descuento en Vino Tinto',
        descuento: 0.10,
        precio: 45.00,
        imagenes: 'images/promociones/vino_tinto.jpg',
        fecha_inicio: '2024-12-01',
        fecha_fin: '2024-12-31',
        id_producto: 1,
        id_categoria: 1,
        es_destacada: true,
      },
      {
        id_promocion: 2,
        nombrePromocion: 'Promo Cervezas',
        descripcion: 'Descuento del 15% en todas las cervezas',
        descuento: 0.15,
        precio: null,
        imagenes: 'images/promociones/cervezas.jpg',
        fecha_inicio: '2024-12-01',
        fecha_fin: '2024-12-31',
        id_producto: null,
        id_categoria: 2,
        es_destacada: false,
      },
      // Agregar más datos de ejemplo aquí...
    ];

    this.filteredPromotions = [...this.promotions];
  }

  createEmptyPromotion() {
    return {
      id_promocion: 0,
      nombrePromocion: '',
      descripcion: '',
      descuento: 0,
      precio: null,
      imagenes: '',
      fecha_inicio: '',
      fecha_fin: '',
      id_producto: null,
      id_categoria: null,
      es_destacada: false,
    };
  }

  closePromocionModal(){
    this.isNoPromocionModalVisible = false;
  }

  buscarPromocion(): void {
    const query = this.searchQuery.trim().toLowerCase();
    this.filteredPromotions = this.promotions.filter((promo) =>
      promo.nombrePromocion.toLowerCase().includes(query)
    );
  }

  openModal(): void {
    this.selectedPromotion = this.createEmptyPromotion(); // Reiniciar al abrir el modal
    this.isModalVisible = true;
  }

  editPromotion(promotion: typeof this.promotions[0]): void {
    this.selectedPromotion = { ...promotion }; // Copiar datos
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }



  savePromotion(): void {
    if (this.selectedPromotion.nombrePromocion) {
      if (this.selectedPromotion.id_promocion) {
        // Actualizar promoción existente
        const index = this.promotions.findIndex(
          (promo) => promo.id_promocion === this.selectedPromotion.id_promocion
        );
        if (index > -1) {
          this.promotions[index] = { ...this.selectedPromotion };
        }
      } else {
        // Agregar nueva promoción
        this.selectedPromotion.id_promocion =
          this.promotions.length > 0
            ? Math.max(...this.promotions.map((promo) => promo.id_promocion)) + 1
            : 1;
        this.promotions.push({ ...this.selectedPromotion });
      }
      this.filteredPromotions = [...this.promotions];
      this.closeModal();
    }
  }

  deletePromotion(promotion: typeof this.promotions[0]): void {
    this.promotions = this.promotions.filter((promo) => promo !== promotion);
    this.filteredPromotions = [...this.promotions];
  }

    // Funciones de exportación (vacías, puedes agregar lógica según sea necesario)
    exportToXLSX(): void {
      // Agregar lógica para exportar a XLSX
      console.log('Exportando a XLSX');
    }

    exportToCSV(): void {
      // Agregar lógica para exportar a CSV
      console.log('Exportando a CSV');
    }

}
