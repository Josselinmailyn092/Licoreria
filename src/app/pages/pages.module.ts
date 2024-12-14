import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactoComponent } from './contacto/contacto.component';
import { HomeComponent } from './home/home.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { ConfiteriaComponent } from './confiteria/confiteria.component';
import { PromocionesComponent } from './promociones/promociones.component';
import { links } from './links.config';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Asegúrate de tener esto también
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button'; // Si usas botones también
import { LicoresModule } from './licores/licores.module';
import { WhiskeyComponent } from './licores/whiskey/whiskey.component';
import { VodkaComponent } from './licores/vodka/vodka.component';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzGridModule } from 'ng-zorro-antd/grid';

@NgModule({
  declarations: [
    
    HomeComponent,

    ConfiteriaComponent,
    PromocionesComponent,
    NosotrosComponent,
    ContactoComponent,
  ],
  imports: [
    
    CommonModule,
    LicoresModule,
    FormsModule,
    NzSelectModule, // Para los selects
    BrowserAnimationsModule, // Necesario para la funcionalidad de los componentes de NG Zorro
    NzButtonModule, // Solo si estás usando botones también  
    NzPaginationModule,
    NzPaginationModule,
    BrowserAnimationsModule,
    NzButtonModule,
    NzCardModule,
    NzCarouselModule,
    NzCardModule,
    NzGridModule
  ],
  exports: [
    
    ]
})
export class PagesModule { 
  links = links;
}
