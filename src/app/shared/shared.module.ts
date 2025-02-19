import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router'; // Asegúrate de importar esto
import { NzButtonModule } from 'ng-zorro-antd/button';
import{NzImageModule}  from 'ng-zorro-antd/image';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FormsModule } from '@angular/forms';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import { ArrowDownOutline, MenuOutline, SearchOutline, ShoppingCartOutline, ArrowRightOutline } from '@ant-design/icons-angular/icons';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FacebookOutline, InstagramOutline } from '@ant-design/icons-angular/icons';
import { HeaderDashboardComponent } from './header-dashboard/header-dashboard.component';
import { SidebarDashboardComponent } from './sidebar-dashboard/sidebar-dashboard.component'
const icons = [ShoppingCartOutline, MenuOutline,SearchOutline, ArrowRightOutline,FacebookOutline, InstagramOutline];

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    HeaderComponent,
    FooterComponent,
    HeaderDashboardComponent,
    SidebarDashboardComponent
  ],
  exports:[HeaderComponent,FooterComponent],
  imports: [
    CommonModule,
    FormsModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    RouterModule,
    NzButtonModule,
    NzDropDownModule,
    NzIconModule, 
    NzIconModule.forRoot(icons),
    NzImageModule,NzPaginationModule,NzGridModule, NzInputModule
    
  ],
  providers: [
    { provide: NZ_ICONS, useValue: [ShoppingCartOutline, SearchOutline, MenuOutline, ArrowDownOutline] }
  ]
})
export class SharedModule {
  }

