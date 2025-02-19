import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { FeaturesModule } from './features/features.module';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PagesModule } from './pages/pages.module';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { SearchOutline, ShoppingCartOutline, DollarOutline, GiftOutline, MenuOutline, AppstoreOutline, LineChartOutline, SettingOutline, HomeOutline, BellOutline, UserOutline, MenuFoldOutline, MenuUnfoldOutline } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { DashboardModule } from './pages/dashboard/dashboard.module';
const icons: IconDefinition[] = [SearchOutline, DollarOutline, GiftOutline, ShoppingCartOutline, MenuOutline, AppstoreOutline, LineChartOutline, SettingOutline, HomeOutline, BellOutline, UserOutline, MenuFoldOutline, MenuUnfoldOutline];
registerLocaleData(en);

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    // Otras declaraciones
  ],
  imports: [
    BrowserModule,
    NzIconModule.forRoot(icons),
    NzAvatarModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    CoreModule,
    SharedModule,
    PagesModule,
    DashboardModule,
    HttpClientModule,
    // Otros módulos
  ],
  providers: [
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(@Inject(NzIconService) private iconService: NzIconService) {
    this.iconService.addIcon(...icons);
  }
}
