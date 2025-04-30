import { Component, OnInit } from '@angular/core';
import { BaseLicoresComponent } from '../../../models/base-licores.component';

@Component({
  selector: 'app-whiskey',
  templateUrl: './whiskey.component.html',
  styleUrls: ['../licores.component.css']
})
export class WhiskeyComponent extends BaseLicoresComponent {
  categoria = 'Whiskey';

}

