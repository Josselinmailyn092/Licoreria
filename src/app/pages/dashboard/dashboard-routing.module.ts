import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InventarioComponent } from './inventario/inventario.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ReporteComponent } from './reporte/reporte.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';



const routes: Routes = [
  { path: 'dashboard', component: DashboardHomeComponent },
  { path: 'home', component: DashboardComponent },
  { path: 'inventario', component: InventarioComponent},
  { path: 'configuracion', component: ConfiguracionComponent },
  {path:'reportes', component: ReporteComponent},
  { path: 'pedidos', component: PedidosComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
