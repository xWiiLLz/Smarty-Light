import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>Hello {{name}}</h1>
  <lightbulbs-list></lightbulbs-list>
  `,
})
export class AppComponent  { name = 'Angular'; }
