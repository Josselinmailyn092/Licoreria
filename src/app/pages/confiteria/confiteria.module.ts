import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// NG-ZORRO Modules
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { DoubleLeftOutline, DoubleRightOutline } from '@ant-design/icons-angular/icons';

// Routing Module
import { ConfiteriaRoutingModule } from './confiteria-routing.module';

// Components
import { ConfiteriaComponent } from './confiteria.component';
import { CaramelosComponent } from './caramelos/caramelos.component';
import { ChicleComponent } from './chicle/chicle.component';
import { ChocolateComponent } from './chocolate/chocolate.component';
import { ChupetesComponent } from './chupetes/chupetes.component';
import { GalletasComponent } from './galletas/galletas.component';
import { GomitasComponent } from './gomitas/gomitas.component';
import { SnaksComponent } from './snaks/snaks.component';
import { AppComponent } from '../../app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
// Icons
const icons = [DoubleLeftOutline, DoubleRightOutline];

@NgModule({
  declarations: [
 
    ConfiteriaComponent,
    CaramelosComponent,
    ChicleComponent,
    ChocolateComponent,
    ChupetesComponent,
    GalletasComponent,
    GomitasComponent,
    SnaksComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
   
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    ConfiteriaRoutingModule,
    // NG-ZORRO Modules
    NzLayoutModule,
    NzPaginationModule,
    NzMenuModule,
    NzGridModule,
    NzCardModule,
    NzButtonModule,
    NzSelectModule,
    NzInputNumberModule,
    NzIconModule
  ],
  exports: [ConfiteriaComponent],
schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: NZ_ICONS, useValue: icons }
  ]
})
export class ConfiteriaModule {}
