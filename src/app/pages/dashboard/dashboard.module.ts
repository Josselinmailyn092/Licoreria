import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SharedModule } from '../../shared/shared.module';
import { InventarioComponent } from './inventario/inventario.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ReporteComponent } from './reporte/reporte.component';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { BrowserModule } from '@angular/platform-browser';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconDefinition } from '@ant-design/icons-angular';
import { DollarOutline, LineChartOutline, ShoppingCartOutline, GiftOutline } from '@ant-design/icons-angular/icons';

@NgModule({
  declarations: [
    DashboardComponent,
    InventarioComponent,
    PedidosComponent,
    ReporteComponent,
    ConfiguracionComponent,
    DashboardHomeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    SharedModule,
    NzCardComponent,
    BrowserModule,
    NzTagModule,
    NzTableModule,
    NzListModule,
    NzIconModule,
    NzAvatarModule,
    FormsModule,
    ReactiveFormsModule,


  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }
