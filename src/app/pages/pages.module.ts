import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n'; import { registerLocaleData } from '@angular/common'
import en from '@angular/common/locales/en';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import {  ArrowRightOutline } from '@ant-design/icons-angular/icons';
import { ConfiteriaModule } from './confiteria/confiteria.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { AppstoreOutline, ShoppingCartOutline, LineChartOutline, SettingOutline } from '@ant-design/icons-angular/icons';

const icons = [ ArrowRightOutline,AppstoreOutline, ShoppingCartOutline, LineChartOutline, SettingOutline];
@NgModule({
  declarations: [
    HomeComponent,

    PromocionesComponent,
    NosotrosComponent
  ],
  imports: [

    CommonModule,
    LicoresModule,
    ConfiteriaModule,

    DashboardModule,
    DashboardRoutingModule,
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
    NzGridModule,
    NzIconModule.forRoot(icons),
  ],
  exports: [

    ],
    providers: [
      { provide: NZ_I18N, useValue: en_US },
      { provide: NZ_ICONS, useValue: icons }
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule {
  links = links;
}
