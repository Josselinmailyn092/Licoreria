import { Component } from '@angular/core';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})
export class ReporteComponent {

  // Selecciones de dropdowns
  periodoSeleccionado = 'ultimo_trimestre';
  cantidadSeleccionada = '10';
  tipoInventarioSeleccionado = 'stock_actual';

  // Mostrar tablas
  mostrarTablaVentas = 'ocultar';
  mostrarTablaProductos = 'ocultar';
  mostrarTablaInventario = 'ocultar';

  // Datos de ejemplo para tablas
  dataVentas = [
    { periodo: 'Enero', ventas: 150 },
    { periodo: 'Febrero', ventas: 200 }
  ];
  columnasVentas = [
    { title: 'Período', dataIndex: 'periodo', key: 'periodo' },
    { title: 'Ventas', dataIndex: 'ventas', key: 'ventas' }
  ];

  dataProductos = [
    { producto: 'Whisky', cantidad: 50 },
    { producto: 'Vodka', cantidad: 30 }
  ];
  columnasProductos = [
    { title: 'Producto', dataIndex: 'producto', key: 'producto' },
    { title: 'Cantidad', dataIndex: 'cantidad', key: 'cantidad' }
  ];

  dataInventario = [
    { producto: 'Ron', stock: 80 },
    { producto: 'Tequila', stock: 60 }
  ];
  columnasInventario = [
    { title: 'Producto', dataIndex: 'producto', key: 'producto' },
    { title: 'Stock', dataIndex: 'stock', key: 'stock' }
  ];

}
