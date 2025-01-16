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
  categoriasFiltradas: Categoria[] = [];
  searchQuery: string = '';
  isModalVisible = false;
  selectedCategory: any = null;
  isNoCategoryModalVisible: boolean = false;
  editingCategory: any = null;

  form: FormGroup;
  categoriasLicores: Categoria[] = [];  // Definimos el tipo de datos
  categoriasConfiteria: Categoria[] = []; // Definimos el tipo de datos
   tiposProducto = [
    { value: 'licores', name: 'Licores' },
    { value: 'Confiteria', name: 'Confitería' }
  ];
  constructor(private fb: FormBuilder, private http: HttpClient, private dashboardService: DashboardService) {
    this.form = this.fb.group({
      nombreCategoria: ['', Validators.required], // Campo 'nombreCategoria'
      tipo: ['', Validators.required],           // Campo 'tipo'
    });
  }

  ngOnInit() {
    this.loadCategories();




  }
  loadCategories() {
    this.dashboardService.getCategorias().subscribe(
      (data: Categoria[]) => {
        console.log('Datos recibidos:', data); // Agrega esto
        this.categorias = data;
        this.categoriasFiltradas = data; // Sincronizar la tabla filtrada
      },
      (error) => {
        console.error('Error al cargar categorías:', error);
        alert('Error al cargar las categorías. Por favor, intente nuevamente.');
      }
    );
  }


  // Funciones de barra de búsqueda
  buscarCategoria() {
    this.categoriasFiltradas = this.categorias.filter(categoria =>
      categoria.nombreCategoria.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    if (this.categoriasFiltradas.length === 0) {

    }
  }


  // Modal para agregar/editar categoría
  openModal(categoria?: Categoria): void {
    this.isModalVisible = true;
    if (categoria) {
      this.editingCategory = categoria;
      this.form.patchValue({
        nombreCategoria: categoria.nombreCategoria,
        tipo: categoria.tipo, // Campo "tipo" para diferenciar entre licores y confitería
      });
    } else {
      this.editingCategory = null;
      this.form.reset(); // Limpiar el formulario
    }
  }


  closeModal(): void {
    this.isModalVisible = false;
    this.editingCategory = null;
    this.form.reset();
  }
  closeNoCategoryModal(): void {
    this.isNoCategoryModalVisible = false;
  }


  deleteCategory(categoria: Categoria): void {
    const confirmacion = confirm(`¿Estás seguro de eliminar la categoría "${categoria.nombreCategoria}"?`);
    if (confirmacion) {
      this.dashboardService.deleteCategory(categoria.id_categoria).subscribe(
        () => {
          this.loadCategories(); // Recargar categorías
          alert('Categoría eliminada con éxito.');
        },
        (error) => {
          console.error('Error al eliminar categoría:', error);
          alert('Error al eliminar la categoría. Inténtelo nuevamente.');
        }
      );
    }
  }



  saveCategory(): void {
    if (this.form.invalid) {
      console.error('Formulario inválido:', this.form.errors);
      return;
    }

    const categoriaData = {
      nombreCategoria: this.form.get('nombreCategoria')?.value,
      tipo: this.form.get('tipo')?.value,
    };

    const saveObservable = this.editingCategory?.id
      ? this.dashboardService.updateCategory(this.editingCategory.id, categoriaData)
      : this.dashboardService.insertCategory(categoriaData);

    saveObservable.subscribe(
      () => {
        this.loadCategories(); // Recargar categorías
        this.closeModal(); // Cerrar el modal
        alert('Categoría guardada con éxito.');
      },
      (error) => {
        console.error('Error al guardar categoría:', error);
        alert('Error al guardar la categoría. Inténtelo nuevamente.');
      }
    );
  }


  editCategory(categoria: any): void {
    this.openModal(categoria); // Abrir el modal
    this.form.patchValue({
      nombreCategoria: categoria.nombreCategoria,
      tipoProducto: categoria.tipo
    });
    this.editingCategory = categoria; // Guardar la categoría en edición
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

