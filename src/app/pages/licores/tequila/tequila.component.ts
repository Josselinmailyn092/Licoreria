import { Component} from '@angular/core';
import { BaseLicoresComponent } from '../../../models/base-licores.component';

@Component({
  selector: 'app-tequila',
  templateUrl: './tequila.component.html',
  styleUrl: '../licores.component.css'
})
export class TequilaComponent extends BaseLicoresComponent{
  categoria = 'Tequila';
}


