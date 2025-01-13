import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DashboardService } from '../../../services/dashboard.service';
import { Categoria } from '../../../models/licores.models';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categorias: any[] = [];
  categoriasFiltradas: any[] = [...this.categorias];
  searchQuery: string = '';
  isModalVisible = false;
  selectedCategory: any = null;
  isNoCategoryModalVisible: boolean = false;
  editingCategory: any = null;

  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private dashboardService: DashboardService) {
    this.form = this.fb.group({
      nombreCategoria: ['', Validators.required],
      descripcion: ['']
    });
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.dashboardService.getCategories().subscribe((data) => {
      this.categorias = data;
      this.categoriasFiltradas = [...this.categorias];
    });
  }

  // Funciones de barra de búsqueda
  buscarCategoria() {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) {
      this.categoriasFiltradas = [...this.categorias];
      return;
    }
    this.categoriasFiltradas = this.categorias.filter(categoria =>
      categoria.nombreCategoria.toLowerCase().includes(query)
    );
  }

  // Modal para agregar/editar categoría
  openModal(categoria?: Categoria): void {
    this.isModalVisible = true;
    if (categoria) {
      this.editingCategory = categoria;
      this.form.patchValue({
        nombreCategoria: categoria.nombreCategoria,
        descripcion: categoria.descripcion
      });
    } else {
      this.editingCategory = null;
      this.form.reset();
    }
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.editingCategory = null;
    this.form.reset();
  }
  closeNoCategoryModal(){

  }
  deleteCategory(){

  }
  saveCategory() {
    if (this.form.invalid) {
      console.error('El formulario no es válido:', this.form.errors);
      return;
    }

    const categoryData = {
      nombreCategoria: this.form.get('nombreCategoria')?.value,
      descripcion: this.form.get('descripcion')?.value
    };

    const saveObservable = this.editingCategory?.id
      ? this.dashboardService.updateCategory(categoryData, this.editingCategory.id)
      : this.dashboardService.insertCategory(categoryData);

    saveObservable.subscribe(
      () => {
        console.log('Categoría guardada/actualizada con éxito');
        this.loadCategories();
        this.closeModal();
      },
      (error) => {
        console.error('Error al guardar/actualizar la categoría:', error);
      }
    );
  }

  editCategory(categoria: any): void {
    this.editingCategory = categoria;
    this.openModal(categoria);
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

