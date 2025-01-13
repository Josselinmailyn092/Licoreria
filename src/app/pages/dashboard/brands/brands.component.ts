import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent implements OnInit {
  searchQuery: string = '';
  brands: Array<{ nombre: string; categoria: string }> = [];
  filteredBrands: Array<{ nombre: string; categoria: string }> = [];
  categories: Array<{ nombre: string }> = []; // Las categorías existentes
  isNoBrandModalVisible: boolean = false;
  isModalVisible: boolean = false;
  selectedBrand: { nombre: string; categoria: string } = { nombre: '', categoria: '' }; // Inicializado

  ngOnInit(): void {
    // Simulando datos iniciales
    this.brands = [
      { nombre: 'Marca A', categoria: 'Licores' },
      { nombre: 'Marca B', categoria: 'Confitería' },
    ];

    this.categories = [
      { nombre: 'Gin' },
      { nombre: 'Cerveza' },
    ];

    this.filteredBrands = [...this.brands];
  }

  buscarMarca(): void {
    const query = this.searchQuery.trim().toLowerCase();

    if (!query) {
      this.filteredBrands = [...this.brands];
      this.closeNoBrandModal(); // Cerrar el modal si no hay búsqueda
      return;
    }

    const results = this.brands.filter((brand) =>
      brand.nombre.toLowerCase().includes(query)
    );

    this.filteredBrands = results;

    if (results.length === 0) {
      this.showNoBrandModal(); // Mostrar el modal si no hay marcas
    } else {
      this.closeNoBrandModal(); // Cerrar el modal si hay marcas
    }
  }

  showNoBrandModal(): void {
    this.isNoBrandModalVisible = true;
  }

  closeNoBrandModal(): void {
    this.isNoBrandModalVisible = false;
  }

  openModal(): void {
    this.selectedBrand = { nombre: '', categoria: '' }; // Reiniciar al abrir el modal
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  saveBrand(): void {
    if (this.selectedBrand.nombre && this.selectedBrand.categoria) {
      const existingIndex = this.brands.findIndex(
        (brand) => brand.nombre === this.selectedBrand.nombre
      );

      if (existingIndex > -1) {
        // Actualizar marca existente
        this.brands[existingIndex] = { ...this.selectedBrand };
      } else {
        // Agregar nueva marca
        this.brands.push({ ...this.selectedBrand });
      }

      this.filteredBrands = [...this.brands];
      this.closeModal(); // Cerrar el modal después de guardar
    } else {
      console.warn('Datos incompletos o no válidos');
    }
  }

  editBrand(brand: { nombre: string; categoria: string }): void {
    this.selectedBrand = { ...brand }; // Copiar los datos de la marca seleccionada
    this.isModalVisible = true;
  }

  deleteBrand(brand: { nombre: string; categoria: string }): void {
    this.brands = this.brands.filter((b) => b !== brand);
    this.filteredBrands = [...this.brands];
  }

  exportToXLSX(): void {
    console.log('Exportar a XLSX');
  }

  exportToCSV(): void {
    console.log('Exportar a CSV');
  }
}
