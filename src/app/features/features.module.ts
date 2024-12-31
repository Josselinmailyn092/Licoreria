import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginInicioComponent } from './auth/login-inicio/login-inicio.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';



@NgModule({
  declarations: [
    LoginInicioComponent,
   
    OrdersComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule
  ],
  // Exporta el CartComponent
  exports: [
    
  ]
})
export class FeaturesModule { }
