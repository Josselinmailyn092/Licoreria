import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
   // Datos de categorías predefinidos
   categories = [
    { nombre: 'Vinos', tipo: 'licores' },
    { nombre: 'Cerveza', tipo: 'licores' },
    { nombre: 'Dulces', tipo: 'confiteria' },
    { nombre: 'Galletas', tipo: 'confiteria' },
  ];

  // Variables para gestionar la búsqueda y el modal
  searchQuery: string = '';
  filteredCategories = [...this.categories];
  isModalVisible = false;
  selectedCategory: any = null;
  isNoCategoryModalVisible: boolean = false;

   // Función para abrir el modal de "No hay categorias"
 showNoCategoryModal() {
  this.isNoCategoryModalVisible = true;
}

// Función para cerrar el modal de "No hay categoruas"
closeNoCategoryModal() {
  this.isNoCategoryModalVisible = false;
}
  // Función para filtrar categorías
  buscarCategoria(): void {
    const query = this.searchQuery.trim().toLowerCase();

    if (!query) {
      this.filteredCategories = [...this.categories];
      return;
    }

    const results = this.categories.filter((category) =>
      category.nombre.toLowerCase().includes(query)
    );

    this.filteredCategories = results;

    if (results.length === 0) {
      this.showNoCategoryModal(); // Mostrar el modal si no hay categorías
    } else {
      this.closeNoCategoryModal(); // Cerrar el modal si hay categorías
    }
  }


  // Función para abrir el modal de edición o creación de categoría
  openModal(category?: any): void {
    this.isModalVisible = true;
    this.selectedCategory = category ? { ...category } : { nombre: '', tipo: 'licores' };
  }

  // Función para cerrar el modal
  closeModal(): void {
    this.isModalVisible = false;
  }

  // Función para guardar o actualizar la categoría
  saveCategory(): void {
    if (this.selectedCategory.nombre) {
      const index = this.categories.findIndex(category => category.nombre === this.selectedCategory.nombre);
      if (index > -1) {
        // Editamos la categoría existente
        this.categories[index] = { ...this.selectedCategory };
      } else {
        // Agregamos una nueva categoría
        this.categories.push({ ...this.selectedCategory });
      }
      this.closeModal();
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  // Función para eliminar una categoría
  deleteCategory(category: any): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      this.categories = this.categories.filter(c => c !== category);
    }
  }
   // Función que no existía y ahora se agrega para editar una categoría
   editCategory(category: any): void {
    this.openModal(category);
  }
// Modal para mostrar mensaje de "No se encontraron productos"
showNoResultsModal(query: string) {
  this.isModalVisible = true;
  this.selectedCategory = {
    nombre: `No se encontraron productos para la búsqueda: "${query}"`, // Mensaje con la búsqueda

  };
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
