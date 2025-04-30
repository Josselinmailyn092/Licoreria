import { Component} from '@angular/core';
import { BaseLicoresComponent } from '../../../models/base-licores.component';

@Component({
  selector: 'app-cerveza',
  templateUrl: './cerveza.component.html',
  styleUrls: ['../licores.component.css']
})
export class CervezaComponent extends BaseLicoresComponent{
  categoria = 'Cerveza';
}


