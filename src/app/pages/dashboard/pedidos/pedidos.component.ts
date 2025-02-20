import { Component } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent {
  searchTerm: string = '';
  estadoSeleccionado: string = '';

  pedidos = [
    { id: 1, cliente: 'Juan Pérez', email: 'juan.perez@email.com', fecha: '2024-03-14', total: 290000, estado: 'Pendiente' },
    { id: 2, cliente: 'María García', email: 'maria.garcia@email.com', fecha: '2024-03-14', total: 273000, estado: 'Completado' },
    { id: 3, cliente: 'Carlos López', email: 'carlos.lopez@email.com', fecha: '2024-03-13', total: 150000, estado: 'En proceso' },
    { id: 4, cliente: 'Ana Martinez', email: 'ana.martinez@email.com', fecha: '2024-03-13', total: 260000, estado: 'Cancelado' }
  ];

  get filteredOrders() {
    return this.pedidos.filter(order =>
      order.cliente.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.estadoSeleccionado ? order.estado === this.estadoSeleccionado : true)
    );
  }

  filtrarPorEstado(estado: string) {
    this.estadoSeleccionado = estado;
  }

  getEstadoColor(estado: string): string {
    const estadosColores: { [key: string]: string } = {
      'Pendiente': 'gold',
      'En proceso': 'blue',
      'Completado': 'green',
      'Cancelado': 'red'
    };
    return estadosColores[estado] || 'default';
  }

}
