import { Component } from '@angular/core';

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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isCollapsed = false;
  ingresosTotales = 125840;
  ticketPromedio = 350;
  totalPedidos = 359;
  pedidosPendientes = 45;
  variaciones = {
    ingresos: 12.5,
    ticket: 8.2,
    pedidos: 5.1,
    pendientes: -2.3
  };

  productosMasVendidos: Producto[] = [
    { nombre: 'Whisky Premium', unidadesVendidas: 145, precio: 25000 },
    { nombre: 'Vodka Especial', unidadesVendidas: 120, precio: 18000 },
    { nombre: 'Ron Añejo', unidadesVendidas: 98, precio: 15000 },
    { nombre: 'Gin Premium', unidadesVendidas: 85, precio: 12000 },
  ];

  pedidosRecientes: Pedido[] = [
    { cliente: 'Juan Pérez', fecha: '14 de marzo, 2024', total: 450, estado: 'Pendiente' },
    { cliente: 'María García', fecha: '14 de marzo, 2024', total: 850, estado: 'Completado' },
    { cliente: 'Carlos López', fecha: '14 de marzo, 2024', total: 320, estado: 'En proceso' },
    { cliente: 'Ana Martínez', fecha: '13 de marzo, 2024', total: 670, estado: 'Completado' },
  ];
}
