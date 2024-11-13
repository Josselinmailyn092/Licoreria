import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginInicioComponent } from './auth/login-inicio/login-inicio.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';



@NgModule({
  declarations: [
    LoginInicioComponent,
    CartComponent,
    OrdersComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FeaturesModule { }
