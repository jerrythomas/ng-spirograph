import { Component } from '@angular/core';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent  {
  name = 'Angular';
  
  inner_radius = 10;
  pen_distance = 9;

  formatLabel(value: number) {
    return Math.round(value*100) / 100;
  }
  
}
