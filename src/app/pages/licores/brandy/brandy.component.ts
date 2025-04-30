import { Component } from '@angular/core';
import { BaseLicoresComponent } from '../../../models/base-licores.component';

@Component({
  selector: 'app-brandy',
  templateUrl: './brandy.component.html',
  styleUrls: ['../licores.component.css'] // Nota: Usa styleUrls en lugar de styleUrl
})
export class BrandyComponent extends BaseLicoresComponent {
  categoria = 'Brandy';
}


