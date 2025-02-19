import { Component } from '@angular/core';
import { Router } from '@angular/router';


interface Producto {
  nombre: string;
  unidadesVendidas: number;
  precio: number;
}

interface Pedido {
  cliente: string;
  fecha: string;
  total: number;
  estado: 'Pendiente' | 'Completado' | 'En proceso';
}
@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.css'
})
export class DashboardHomeComponent {
  ingresosTotales = 125840;
  ticketPromedio = 350;
  totalPedidos = 359;
  pedidosPendientes = 45;


  productos = [
    { nombre: 'Whisky Premium', unidades: 145, precio: 25000 },
    { nombre: 'Vodka Especial', unidades: 120, precio: 18000 },
    { nombre: 'Ron Añejo', unidades: 98, precio: 15000 },
    { nombre: 'Gin Premium', unidades: 85, precio: 12000 }
  ];

  pedidos = [
    { nombre: 'Juan Pérez', fecha: '14 de marzo, 2024', monto: 450, estado: 'Pendiente', estadoColor: 'orange' },
    { nombre: 'María García', fecha: '14 de marzo, 2024', monto: 850, estado: 'Completado', estadoColor: 'green' },
    { nombre: 'Carlos López', fecha: '14 de marzo, 2024', monto: 320, estado: 'En proceso', estadoColor: 'blue' },
    { nombre: 'Ana Martínez', fecha: '13 de marzo, 2024', monto: 670, estado: 'Completado', estadoColor: 'green' }
  ];



  productosMasVendidos = [
    { nombre: 'Whisky Premium', unidades: 145, precio: 25000 },
    { nombre: 'Vodka Especial', unidades: 120, precio: 18000 },
    { nombre: 'Ron Añejo', unidades: 98, precio: 15000 },
    { nombre: 'Gin Premium', unidades: 85, precio: 12000 }
  ];

  pedidosRecientes = [
    { nombre: 'Juan Pérez', fecha: '14 de marzo, 2024', total: 450, estado: 'Pendiente' },
    { nombre: 'María García', fecha: '14 de marzo, 2024', total: 850, estado: 'Completado' },
    { nombre: 'Carlos López', fecha: '14 de marzo, 2024', total: 320, estado: 'En proceso' },
    { nombre: 'Ana Martínez', fecha: '13 de marzo, 2024', total: 670, estado: 'Completado' }
  ];

  getEstadoColor(estado: string): string {
    switch (estado) {
      case 'Pendiente': return 'gold';
      case 'Completado': return 'green';
      case 'En proceso': return 'blue';
      default: return 'default';
    }
  }
}


