import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout'; // Importa este módulo
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { SalesComponent } from './sales/sales.component';
import { BrandsComponent } from './brands/brands.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {NzModalModule} from 'ng-zorro-antd/modal';
import { PromocionComponent } from './promocion/promocion.component'
@NgModule({
  declarations: [
    DashboardHomeComponent,
    SalesComponent,
    BrandsComponent,
    CategoriesComponent,
    ProductsComponent,
    DashboardLayoutComponent,
    PromocionComponent


  ],
  imports: [
    CommonModule,
    RouterModule,
    NzLayoutModule,
    NzCardModule ,
    FormsModule, // Necesario para [(ngModel)]
    ReactiveFormsModule,
    NzFormModule, // Importa los módulos de NG-ZORRO usados en el formulario
    NzInputModule, // Si usas nz-input
    NzButtonModule, // Si usas botones de NG-ZORRO
    NzModalModule, // Para el modal // Inclúyelo aquí
  ]
})
export class DashboardModule { }
